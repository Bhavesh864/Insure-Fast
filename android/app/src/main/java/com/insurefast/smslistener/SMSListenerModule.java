package com.insurefast.smslistener;

import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.os.Build;
import android.provider.Telephony;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class SMSListenerModule extends ReactContextBaseJavaModule {
    private static final String REACT_CLASS = "SMSListener";
    private ReactApplicationContext mReactContext;

    private BroadcastReceiver mReceiver;
    private boolean isReceiverRegistered = false;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    public SMSListenerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @ReactMethod
    public void startListen() {
         mReceiver = new SMSListenerReceiver(mReactContext);
         registerReceiverIfNecessary(mReceiver);
    }

    private void registerReceiverIfNecessary(BroadcastReceiver mReceiver) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && getCurrentActivity() != null) {
            getCurrentActivity().registerReceiver(
                    mReceiver,
                    new IntentFilter(Telephony.Sms.Intents.SMS_RECEIVED_ACTION)
            );
            isReceiverRegistered = true;
            return;
        }

        if (getCurrentActivity() != null) {
            getCurrentActivity().registerReceiver(
                    mReceiver,
                    new IntentFilter("android.provider.Telephony.SMS_RECEIVED")
            );
            isReceiverRegistered = true;
        }
    }

    @ReactMethod
    public void unregisterReceiver() {
         if (isReceiverRegistered && getCurrentActivity() != null) {
             getCurrentActivity().unregisterReceiver(mReceiver);
             isReceiverRegistered = false;
         }
    }

}
