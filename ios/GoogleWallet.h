
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNGoogleWalletSpec.h"

@interface GoogleWallet : NSObject <NativeGoogleWalletSpec>
#else
#import <React/RCTBridgeModule.h>

@interface GoogleWallet : NSObject <RCTBridgeModule>
#endif

@end
