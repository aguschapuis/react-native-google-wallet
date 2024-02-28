package com.googlewallet;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import com.google.android.gms.pay.Pay;
import com.google.android.gms.pay.PayApiAvailabilityStatus;
import com.google.android.gms.pay.PayClient;

@ReactModule(name = GoogleWalletModule.NAME)
public class GoogleWalletModule extends ReactContextBaseJavaModule {
  public static final String NAME = "GoogleWallet";

  private PayClient walletClient;
  private final int addToGoogleWalletRequestCode = 1000;

  public GoogleWalletModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.walletClient = Pay.getClient(reactContext);

  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }

  @ReactMethod
  public void addPass(String newObjectJson) {
    walletClient.savePasses(newObjectJson, getCurrentActivity(), addToGoogleWalletRequestCode);
  }
}
