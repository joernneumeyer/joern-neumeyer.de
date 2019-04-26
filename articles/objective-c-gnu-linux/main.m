#import <Foundation/Foundation.h>
#import "Foo.h"

int main() {
  NSAutoreleasePool* pool = NSAutoreleasePool.new;

  Foo* f = [[Foo alloc] initWithName:@"test"];

  [f release];

  [pool drain];
  return 0;
}
