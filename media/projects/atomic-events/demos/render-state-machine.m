#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <AppKit/AppKit.h>
#import <CoreVideo/CoreVideo.h>
#import <CoreMedia/CoreMedia.h>
#import <CoreGraphics/CoreGraphics.h>

static const int W=1780,H=1248,FPS=50;
static NSColor *color(unsigned int n) { return [NSColor colorWithSRGBRed:((n>>16)&255)/255. green:((n>>8)&255)/255. blue:(n&255)/255. alpha:1]; }
static void box(NSRect r,double radius,unsigned int hex) { [color(hex) setFill]; [[NSBezierPath bezierPathWithRoundedRect:r xRadius:radius yRadius:radius] fill]; }
static void label(NSString *s,double x,double y,double size,NSFontWeight weight,unsigned int hex) { [s drawAtPoint:NSMakePoint(x,y) withAttributes:@{NSFontAttributeName:[NSFont systemFontOfSize:size weight:weight],NSForegroundColorAttributeName:color(hex)}]; }
static void mono(NSString *s,double x,double y,double size,unsigned int hex) { [s drawAtPoint:NSMakePoint(x,y) withAttributes:@{NSFontAttributeName:[NSFont monospacedSystemFontOfSize:size weight:NSFontWeightMedium],NSForegroundColorAttributeName:color(hex)}]; }
static double clamp(double v) { return fmax(0,fmin(1,v)); }
static double eased(double v) { v=clamp(v); return v*v*v*(v*(v*6-15)+10); }
static void line(double x1,double y1,double x2,double y2,unsigned int hex,double width) { [color(hex) setStroke]; NSBezierPath *p=[NSBezierPath bezierPath]; [p moveToPoint:NSMakePoint(x1,y1)]; [p lineToPoint:NSMakePoint(x2,y2)]; p.lineWidth=width; [p stroke]; }

static void center(NSString *text,double x,double y,double size,NSFontWeight weight,unsigned hex) {
    NSDictionary *attrs=@{NSFontAttributeName:[NSFont systemFontOfSize:size weight:weight],NSForegroundColorAttributeName:color(hex)};
    [text drawAtPoint:NSMakePoint(x-[text sizeWithAttributes:attrs].width/2,y) withAttributes:attrs];
}
static void arrowHead(NSPoint control,NSPoint tip,NSColor *stroke,double width) {
    [stroke setStroke];
    double dx=tip.x-control.x,dy=tip.y-control.y,length=hypot(dx,dy);dx/=length;dy/=length;
    NSBezierPath *head=[NSBezierPath bezierPath];
    [head moveToPoint:NSMakePoint(tip.x-19*dx-8.5*dy,tip.y-19*dy+8.5*dx)];
    [head lineToPoint:tip];
    [head lineToPoint:NSMakePoint(tip.x-19*dx+8.5*dy,tip.y-19*dy-8.5*dx)];
    head.lineWidth=width;head.lineCapStyle=NSLineCapStyleRound;head.lineJoinStyle=NSLineJoinStyleRound;[head stroke];
}
static void arrow(NSPoint a,NSPoint b,NSPoint c,NSPoint d,unsigned hex,double width) {
    [color(hex) setStroke];
    NSBezierPath *path=[NSBezierPath bezierPath];
    [path moveToPoint:a];[path curveToPoint:d controlPoint1:b controlPoint2:c];
    path.lineWidth=width;path.lineCapStyle=NSLineCapStyleRound;[path stroke];
    arrowHead(c,d,color(hex),width);
}
static NSPoint curvePoint(NSPoint a,NSPoint b,NSPoint c,NSPoint d,double u) {
    // Continue along the endpoint tangent while the gradient fades off the curve.
    if(u<0)return NSMakePoint(a.x+3*u*(b.x-a.x),a.y+3*u*(b.y-a.y));
    if(u>1)return NSMakePoint(d.x+3*(u-1)*(d.x-c.x),d.y+3*(u-1)*(d.y-c.y));
    double v=1-u;
    return NSMakePoint(v*v*v*a.x+3*v*v*u*b.x+3*v*u*u*c.x+u*u*u*d.x,
                      v*v*v*a.y+3*v*v*u*b.y+3*v*u*u*c.y+u*u*u*d.y);
}
static void gradientArrow(NSPoint a,NSPoint b,NSPoint c,NSPoint d,double phase,unsigned from,unsigned to) {
    if(phase<=0||phase>=1)return;
    double envelope=eased(phase/.18)*eased((1-phase)/.18);
    double centerU=-.24+1.48*eased(phase);
    NSPoint point=curvePoint(a,b,c,d,centerU);
    double direction=d.x>a.x?1:-1;
    CGFloat locations[7]={0,.18,.35,.5,.65,.82,1};
    double alpha[7]={0,.08,.42,.9,.42,.08,0};
    CGFloat components[28];
    for(int i=0;i<7;i++){
        double blend=clamp(centerU+(locations[i]-.5)*.6);
        for(int channel=0;channel<3;channel++){
            int shift=16-channel*8;
            components[i*4+channel]=(((from>>shift)&255)*(1-blend)+((to>>shift)&255)*blend)/255.;
        }
        components[i*4+3]=alpha[i]*envelope;
    }
    CGContextRef context=NSGraphicsContext.currentContext.CGContext;
    CGMutablePathRef curve=CGPathCreateMutable();
    CGPathMoveToPoint(curve,NULL,a.x,a.y);
    CGPathAddCurveToPoint(curve,NULL,b.x,b.y,c.x,c.y,d.x,d.y);
    CGPathRef stroke=CGPathCreateCopyByStrokingPath(curve,NULL,5,kCGLineCapRound,kCGLineJoinRound,0);
    CGColorSpaceRef space=CGColorSpaceCreateDeviceRGB();
    CGGradientRef gradient=CGGradientCreateWithColorComponents(space,components,locations,7);
    CGContextSaveGState(context);CGContextAddPath(context,stroke);CGContextClip(context);
    CGContextDrawLinearGradient(context,gradient,CGPointMake(point.x-140*direction,point.y),CGPointMake(point.x+140*direction,point.y),0);
    CGContextRestoreGState(context);
    // The arrowhead fades continuously as the gradient reaches its endpoint.
    double distance=(d.x-point.x)/72.;
    double headAlpha=exp(-.5*distance*distance)*envelope*.9;
    arrowHead(c,d,[color(to) colorWithAlphaComponent:headAlpha],5);
    CGGradientRelease(gradient);CGColorSpaceRelease(space);CGPathRelease(stroke);CGPathRelease(curve);
}
static void stateDot(NSPoint point,double activity,unsigned hex) {
    double radius=23+12*activity;
    [[color(hex) colorWithAlphaComponent:.32+.68*activity] setFill];
    [[NSBezierPath bezierPathWithOvalInRect:NSMakeRect(point.x-radius,point.y-radius,radius*2,radius*2)] fill];
}

int main(int argc,const char **argv) { @autoreleasepool {
NSString *root=argc>1?[NSString stringWithUTF8String:argv[1]]:NSFileManager.defaultManager.currentDirectoryPath;
NSString *out=[root stringByAppendingPathComponent:@"media/projects/atomic-events/demos/atomic-events-circular-orbit.mp4"];
[[NSFileManager defaultManager] removeItemAtPath:out error:nil];
AVURLAsset *asset=[AVURLAsset URLAssetWithURL:[NSURL fileURLWithPath:[root stringByAppendingPathComponent:@"public/videos/case-studies/atomic-events-apply-rewards-thumbnail.mp4"]] options:nil];
AVAssetImageGenerator *gen=[[AVAssetImageGenerator alloc] initWithAsset:asset];
gen.appliesPreferredTrackTransform=YES; gen.requestedTimeToleranceBefore=kCMTimeZero; gen.requestedTimeToleranceAfter=kCMTimeZero;
NSError *error=nil;
AVAssetWriter *writer=[[AVAssetWriter alloc] initWithURL:[NSURL fileURLWithPath:out] fileType:AVFileTypeMPEG4 error:&error];
AVAssetWriterInput *input=[AVAssetWriterInput assetWriterInputWithMediaType:AVMediaTypeVideo outputSettings:@{AVVideoCodecKey:AVVideoCodecTypeH264,AVVideoWidthKey:@(W),AVVideoHeightKey:@(H),AVVideoCompressionPropertiesKey:@{AVVideoAverageBitRateKey:@(4200000),AVVideoExpectedSourceFrameRateKey:@(FPS),AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel}}];
input.expectsMediaDataInRealTime=NO;
AVAssetWriterInputPixelBufferAdaptor *adapter=[AVAssetWriterInputPixelBufferAdaptor assetWriterInputPixelBufferAdaptorWithAssetWriterInput:input sourcePixelBufferAttributes:@{(id)kCVPixelBufferPixelFormatTypeKey:@(kCVPixelFormatType_32ARGB),(id)kCVPixelBufferWidthKey:@(W),(id)kCVPixelBufferHeightKey:@(H),(id)kCVPixelBufferCGImageCompatibilityKey:@YES,(id)kCVPixelBufferCGBitmapContextCompatibilityKey:@YES}];
[writer addInput:input]; writer.shouldOptimizeForNetworkUse=YES;
if(![writer startWriting]) { NSLog(@"%@",writer.error);return 1; }
[writer startSessionAtSourceTime:kCMTimeZero];
CGImageRef cleanCG=[gen copyCGImageAtTime:CMTimeMakeWithSeconds(.72,2500) actualTime:NULL error:&error];
if(!cleanCG){NSLog(@"Clean frame: %@",error);return 1;}
CGImageRef cleanCrop=CGImageCreateWithImageInRect(cleanCG,CGRectMake(431,13,418,694));
NSImage *cleanPhone=[[NSImage alloc] initWithCGImage:cleanCrop size:NSMakeSize(418,694)];
CGImageRelease(cleanCrop);CGImageRelease(cleanCG);
const double length=12.76;
for(int f=0;f<(int)llround(length*FPS);f++) { @autoreleasepool {
double t=(double)f/FPS;
// Give each Waiting phase about 1.3 seconds while retaining the actual UX frames.
// Unaffected sections retain normal playback speed; source latency values remain
// independent of this presentation timing.
double sourceTime;
if(t<2.12) sourceTime=.72+t;
else if(t<3.42) sourceTime=2.84+(t-2.12)*(.28/1.3);
else if(t<6.05) sourceTime=3.12+(t-3.42);
else if(t<7.35) sourceTime=5.75+(t-6.05)*(.45/1.3);
else if(t<8.73) sourceTime=6.20+(t-7.35);
else if(t<10.03) sourceTime=7.58+(t-8.73)*(1.66/1.3);
else sourceTime=fmin(11.32,9.24+(t-10.03));
CGImageRef source=[gen copyCGImageAtTime:CMTimeMakeWithSeconds(sourceTime,2500) actualTime:NULL error:&error];
if(!source){NSLog(@"Decode: %@",error);return 1;}
CGImageRef cropped=CGImageCreateWithImageInRect(source,CGRectMake(431,13,418,694));
NSImage *phone=[[NSImage alloc] initWithCGImage:cropped size:NSMakeSize(418,694)];
CVPixelBufferRef buffer=NULL;
if(CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault,adapter.pixelBufferPool,&buffer)!=kCVReturnSuccess){return 1;}
CVPixelBufferLockBaseAddress(buffer,0);
CGColorSpaceRef space=CGColorSpaceCreateDeviceRGB();
CGContextRef cg=CGBitmapContextCreate(CVPixelBufferGetBaseAddress(buffer),W,H,8,CVPixelBufferGetBytesPerRow(buffer),space,kCGImageAlphaNoneSkipFirst|kCGBitmapByteOrder32Big);
CGColorSpaceRelease(space);
NSGraphicsContext *graphics=[NSGraphicsContext graphicsContextWithCGContext:cg flipped:NO];
[NSGraphicsContext saveGraphicsState]; [NSGraphicsContext setCurrentContext:graphics];
[color(0xf7f8f5) setFill]; NSRectFill(NSMakeRect(0,0,W,H));

NSRect phoneRect=NSMakeRect(82,76,650,1079);
[NSGraphicsContext saveGraphicsState]; NSShadow *shadow=[[NSShadow alloc] init]; shadow.shadowColor=[color(0x213b59) colorWithAlphaComponent:.08]; shadow.shadowBlurRadius=24; shadow.shadowOffset=NSMakeSize(0,-10); [shadow set]; box(phoneRect,46,0xffffff); [NSGraphicsContext restoreGraphicsState];
CGContextSaveGState(cg);
[[NSBezierPath bezierPathWithRoundedRect:phoneRect xRadius:46 yRadius:46] addClip];
[phone drawInRect:phoneRect fromRect:NSZeroRect operation:NSCompositingOperationCopy fraction:1 respectFlipped:NO hints:@{NSImageHintInterpolation:@(NSImageInterpolationHigh)}];
// Restore clean bezel pixels where old baked-in callout connectors touch it.
double sx=phoneRect.size.width/418.,sy=phoneRect.size.height/694.;
[cleanPhone drawInRect:NSMakeRect(phoneRect.origin.x,phoneRect.origin.y+20*sy,22*sx,220*sy) fromRect:NSMakeRect(0,20,22,220) operation:NSCompositingOperationCopy fraction:1];
[cleanPhone drawInRect:NSMakeRect(phoneRect.origin.x+400*sx,phoneRect.origin.y,18*sx,500*sy) fromRect:NSMakeRect(400,0,18,500) operation:NSCompositingOperationCopy fraction:1];
// Restore clipping before drawing the enlarged explanation panel.
CGContextRestoreGState(cg);
NSString *title=nil,*duration=nil;
double start=0,end=0,demoStart=0,demoEnd=0;
if(sourceTime>=7.58){title=@"Pay with PayPal";duration=@"3,641";start=7.58;end=9.24;demoStart=8.73;demoEnd=10.03;}
else if(sourceTime>=5.75){title=@"Apply rewards";duration=@"1";start=5.75;end=6.20;demoStart=6.05;demoEnd=7.35;}
else if(sourceTime>=2.84){title=@"View rewards";duration=@"16";start=2.84;end=3.12;demoStart=2.12;demoEnd=3.42;}
bool waitingNow=title&&sourceTime<end;
bool complete=title&&!waitingNow;
double progress=title?clamp((sourceTime-start)/(end-start)):0;
// Hide the previous event while returning to the opening state at the loop seam.
double seam=eased((t-(length-.64))/.64);
if(seam>0){
CGImageRef first=[gen copyCGImageAtTime:CMTimeMakeWithSeconds(.72,2500) actualTime:NULL error:NULL];
CGImageRef cropFirst=CGImageCreateWithImageInRect(first,CGRectMake(431,13,418,694)); NSImage *firstPhone=[[NSImage alloc] initWithCGImage:cropFirst size:NSMakeSize(418,694)];
[NSGraphicsContext saveGraphicsState]; [[NSBezierPath bezierPathWithRoundedRect:phoneRect xRadius:46 yRadius:46] addClip]; [firstPhone drawInRect:phoneRect fromRect:NSZeroRect operation:NSCompositingOperationSourceOver fraction:seam respectFlipped:NO hints:nil]; [NSGraphicsContext restoreGraphicsState]; CGImageRelease(cropFirst);CGImageRelease(first);
}
// Abstract two-state loop: fixed green/yellow dots, no state or edge labels.
// No dot travels between the real checkout and this diagram.
CGContextSaveGState(cg);
// Continuous 300 ms state fades at 50 fps; no threshold-based arrow switches.
double waitActivity=waitingNow?eased((t-demoStart)/.30)*eased((demoEnd-t)/.30):0;
// Circular-orbit option: opposing arcs around a shared center, with short heads.
NSPoint outA=NSMakePoint(1057,875),outB=NSMakePoint(1113,1082),outC=NSMakePoint(1407,1082),outD=NSMakePoint(1463,875);
NSPoint backA=NSMakePoint(1463,765),backB=NSMakePoint(1407,558),backC=NSMakePoint(1113,558),backD=NSMakePoint(1057,765);
arrow(outA,outB,outC,outD,0xc5cbc5,3.5);
arrow(backA,backB,backC,backD,0xc5cbc5,3.5);
if(title){
    gradientArrow(outA,outB,outC,outD,(t-demoStart)/.56,0x141713,0x141713);
    gradientArrow(backA,backB,backC,backD,(t-(demoEnd-.44))/.56,0x141713,0x141713);
}
stateDot(NSMakePoint(1050,820),1-waitActivity,0x00c805);
stateDot(NSMakePoint(1470,820),waitActivity,0xf3c52e);
if(title){
    CGContextSaveGState(cg);
    CGContextSetAlpha(cg,1-seam);
    label(title,886,450,60,NSFontWeightRegular,0x141713);
    if(complete){
        NSFont *numberFont=[NSFont systemFontOfSize:112 weight:NSFontWeightRegular];
        NSDictionary *attrs=@{NSFontAttributeName:numberFont,NSForegroundColorAttributeName:color(0x141713)};
        double numberWidth=[duration sizeWithAttributes:attrs].width;
        [duration drawAtPoint:NSMakePoint(882,232) withAttributes:attrs];
        label(@"ms",900+numberWidth,252,42,NSFontWeightRegular,0x687368);
        label(@"✓ Ok",1480,252,42,NSFontWeightMedium,0x147a36);
    }
    CGContextRestoreGState(cg);
}
CGContextRestoreGState(cg);
CGContextSetAlpha(cg,1);
[NSGraphicsContext restoreGraphicsState];
// Poster and a full-size still for reviewing the split composition.
if(f==390){CGImageRef frame=CGBitmapContextCreateImage(cg);NSBitmapImageRep *rep=[[NSBitmapImageRep alloc] initWithCGImage:frame];[[rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}] writeToFile:[root stringByAppendingPathComponent:@"media/projects/atomic-events/demos/atomic-events-circular-orbit-poster.png"] atomically:YES];CGImageRelease(frame);}
CVPixelBufferUnlockBaseAddress(buffer,0);
while(!input.readyForMoreMediaData){[NSThread sleepForTimeInterval:.002];}
if(![adapter appendPixelBuffer:buffer withPresentationTime:CMTimeMake(f,FPS)]){NSLog(@"Encode: %@",writer.error);return 1;}
CGContextRelease(cg);CVPixelBufferRelease(buffer);CGImageRelease(cropped);CGImageRelease(source);
if(f%50==0){printf("Rendered %d/%d frames\n",f,(int)llround(length*FPS));fflush(stdout);}
}}
[input markAsFinished];dispatch_semaphore_t sem=dispatch_semaphore_create(0);[writer finishWritingWithCompletionHandler:^{dispatch_semaphore_signal(sem);}];dispatch_semaphore_wait(sem,DISPATCH_TIME_FOREVER);
if(writer.status!=AVAssetWriterStatusCompleted){NSLog(@"%@",writer.error);return 1;}printf("Created %s\n",out.UTF8String);
}return 0;}
