package com.insurefast.smslistener;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.insurefast.MainActivity;

import org.json.JSONException;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/*
 * This is invoked by the Alarm Manager when it is time to display a scheduled notification.
 */
public class SMSListenerReceiver extends BroadcastReceiver {
    private ReactApplicationContext mContext;
    private static final String EVENT = "SMSEventListener";

    static boolean isAppInForeground(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        if (activityManager == null) return false;

        List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
        if (appProcesses == null) return false;

        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (
                    appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                            && appProcess.processName.equals(packageName)
            ) {
                ReactContext reactContext;

                try {
                    reactContext = (ReactContext) context;
                } catch (ClassCastException exception) {
                    // Not react context so default to true
                    return true;
                }

                return reactContext.getLifecycleState() == LifecycleState.RESUMED;
            }
        }

        return false;
    }

    public SMSListenerReceiver() {
        super();
    }

    public SMSListenerReceiver(ReactApplicationContext context) {
        mContext = context;
    }

    private void receiveMessage(SmsMessage message, String body) {
         if (mContext == null) {
             return;
         }

         if (!mContext.hasActiveCatalystInstance()) {
             return;
         }

         Log.d(
                 "SmsListenerPackage",
                 String.format("%s: %s", message.getOriginatingAddress(), message.getMessageBody())
         );

         WritableNativeMap receivedMessage = new WritableNativeMap();

         receivedMessage.putString("originatingAddress", message.getOriginatingAddress());
         receivedMessage.putString("body", body.length() > 0 ? body : message.getMessageBody());

         receivedMessage.putDouble("timestamp", message.getTimestampMillis());

         String myMessage = body.length() > 0 ? body : message.getMessageBody();
         if (message != null) {
             Pattern pattern = Pattern.compile("(\\d{5})");
             //   \d is for a digit
             //   {} is the number of digits here 4.
             Matcher matcher = pattern.matcher(myMessage);
             String val = "";
             if (matcher.find()) {
                 val = matcher.group(0);  // 4 digit number
                 receivedMessage.putString("OTP", val);
             } else {

             }
         }
         mContext
                 .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                 .emit(EVENT, receivedMessage);
    }

    private void receiveMultipartMessage(SmsMessage[] messages) {
        SmsMessage sms = messages[0];
        String body;

        if (messages.length == 1 || sms.isReplace()) {
            body = sms.getDisplayMessageBody();
        } else {
            StringBuilder bodyText = new StringBuilder();

            for (SmsMessage message : messages) {
                bodyText.append(message.getMessageBody());
            }

            body = bodyText.toString();
        }

        receiveMessage(sms, body);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
             receiveMultipartMessage(Telephony.Sms.Intents.getMessagesFromIntent(intent));
             return;
         }

         try {
             final Bundle bundle = intent.getExtras();

             if (bundle == null || !bundle.containsKey("pdus")) {
                 return;
             }

             final Object[] pdus = (Object[]) bundle.get("pdus");
             final SmsMessage[] messages = new SmsMessage[pdus.length];

             for (int i = 0; i < pdus.length; i++) {
                 messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
             }

             receiveMultipartMessage(messages);
         } catch (Exception e) {
             Log.e("OnReceiver", e.getMessage());
         }
    }
}