package com.insurefast.smslistener;

/*
 * This is invoked by the Alarm Manager when it is time to display a scheduled notification.
 */

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import javax.annotation.Nullable;

public class SMSListenerHeadlessService extends HeadlessJsTaskService {
    private Context myContext;

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig(
                    "SMSListenerTask",
                    Arguments.fromBundle(extras),
                    1000, // timeout for the task
                    true // optional: defines whether or not  the task is allowed in foreground. Default is false
            );
        }
        return null;
    }
}
