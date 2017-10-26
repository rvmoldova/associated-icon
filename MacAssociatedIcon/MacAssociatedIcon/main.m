//
//  main.m
//  MacAssociatedIcon
//
//  Created by Admin on 10/26/17.
//  Copyright © 2017 Labs42. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>
#import "main.h"
#import "Response.h"


NSImage* appIcon(NSString *path){
    NSImage *image = [[NSWorkspace sharedWorkspace] iconForFile:path];
    return image;
}

NSData* rasterizeIcon(NSImage *image){
    CGImageRef imageRef=[image CGImageForProposedRect:NULL
                                              context:nil
                                                hints:nil];
    NSBitmapImageRep *bitImage=[[NSBitmapImageRep alloc] initWithCGImage:imageRef];
    NSSize customSize;
    customSize.height=64;
    customSize.width=64;
    [bitImage setSize:customSize];
    return [bitImage representationUsingType:NSPNGFileType properties:nil];
}


NSString* getIconAsBase64(NSString *path){
    NSImage *icon=appIcon(path);
    NSData *rasterizedIcon=rasterizeIcon(icon)  ;
    NSDataBase64EncodingOptions options;
    
    NSData* base64Data=[rasterizedIcon base64EncodedDataWithOptions:(NSDataBase64EncodingOptions)options];
    NSString* base64String=[[NSString alloc]initWithData:base64Data encoding:NSUTF8StringEncoding];
    return base64String;
}

NSString* getJson(Response *data){
    NSError *writeError = nil;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:data.dictionary options:NSJSONWritingPrettyPrinted error:&writeError];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    return jsonString;
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        if(argc==2){
            Response *response=[[Response alloc] init];
            NSString *path=[NSString stringWithUTF8String:argv[1]];
            response.Path=path;
            response.Base64Image=getIconAsBase64(path);
            printf([getJson(response) UTF8String]);
            return 0;
        } else{
            return (EXIT_CODES)BadArguments;
        }
    }
    return 0;
}