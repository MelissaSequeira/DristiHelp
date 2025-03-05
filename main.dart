import 'package:flutter/material.dart';
import 'package:camera/camera.dart';

List<CameraDescription>? cameras;  // Store available cameras globally
CameraController? controller;  // Declare camera controller

Future<void> main() async {
  // Ensure widgets are initialized before calling asynchronous code
  WidgetsFlutterBinding.ensureInitialized();

  // Fetch the available cameras before initializing the app
  cameras = await availableCameras();

  // Run the app
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();

    // Check if cameras are available before initializing the controller
    if (cameras != null && cameras!.isNotEmpty) {
      controller = CameraController(
        cameras![0],  // Select the first available camera
        ResolutionPreset.medium,  // Set the resolution preset
      );

      // Initialize the camera and update the UI when done
      controller!.initialize().then((_) {
        if (!mounted) return;
        setState(() {});  // Trigger a rebuild after initialization
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (controller == null || !controller!.value.isInitialized) {
      return MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('Object Detection App')),
          body: Center(child: CircularProgressIndicator()),  // Show loading indicator
        ),
      );
    }

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('DristiHelp')),
        body: CameraPreview(controller!),  // Display camera feed once initialized
      ),
    );
  }

  @override
  void dispose() {
    controller?.dispose();  // Dispose of the controller when the widget is destroyed
    super.dispose();
  }
}
