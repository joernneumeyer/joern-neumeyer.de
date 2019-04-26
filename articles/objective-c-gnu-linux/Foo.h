#import <Foundation/Foundation.h>

@interface Foo: NSObject {
  NSString* name;
}

-(id)initWithName: (NSString*)name_;

@property(nonatomic, strong) NSString* name;

@end
