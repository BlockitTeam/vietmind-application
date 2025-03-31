#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
// Start: Facebook Login Import 
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>
// End: Facebook Login Import 


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"vietmind_mobile";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

// Start: Facebook config step 2
  [[FBSDKApplicationDelegate sharedInstance] application:application
                       didFinishLaunchingWithOptions:launchOptions];
// End: Facebook config step 2


  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
// Handle deep linking for react-native-app-auth & inappbrowser-reborn
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }
  return NO;
}

@end
