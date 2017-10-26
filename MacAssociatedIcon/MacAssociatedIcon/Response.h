//
//  Response.h
//  MacAssociatedIcon
//
//  Created by Admin on 10/26/17.
//  Copyright © 2017 Labs42. All rights reserved.
//

@interface Response:NSObject{
    NSString *Path;
    NSString *Base64Image;
}
@property(nonatomic,retain) NSString* Path;
@property(nonatomic,retain) NSString* Base64Image;

-(NSDictionary *)dictionary;

@end