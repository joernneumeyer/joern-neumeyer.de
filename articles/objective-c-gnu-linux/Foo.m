#import "Foo.h"

@implementation Foo

@synthesize name;

-(id)init {
  self = nil;
  NSLog(@"default constructor");
  return self;
}

-(id)initWithName: (NSString*)name_ {
  self = [super init];
  self.name = name_;
  NSLog(@"ctor with name: '%@'", name_);
  return self;
}

-(void)dealloc {
  NSLog(@"de-allocating Foo with name '%@'", self.name);
  [self.name release];
  [super dealloc];
}

@end
