//
//  Response.m
//  MacAssociatedIcon
//
//  Created by Admin on 10/26/17.
//  Copyright © 2017 Labs42. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>
#import "Response.h"


@implementation Response

@synthesize Base64Image=Base64Image_;
@synthesize Path=Path_;

-(void) dealloc {
    self.Base64Image = nil;
    self.Path = nil;
}

-(NSDictionary *)dictionary {
    return [NSDictionary dictionaryWithObjectsAndKeys:self.Base64Image,@"Base64Image",self.Path,@"Path", nil];
}

@end