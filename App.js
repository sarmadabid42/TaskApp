import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';

export default function App() {
  const [shapes, setShapes] = useState([]);
  const svgRef = useRef(null);

  const addShape = (shape) => {
    setShapes([...shapes, shape]);
  };

  const captureAndSave = async () => {
    try {
      if (svgRef.current) {
        const uri = await captureRef(svgRef, {
          format: 'png',
          quality: 0.8,
        });
        console.log('Screenshot captured:', uri);

        // Handle the screenshot URI as needed
      }
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  const handleCanvasPress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    addShape({ cx: locationX, cy: locationY, r: 20, fill: 'blue' });
  };

  return (
    <View style={styles.container}>
      <Svg ref={svgRef} style={styles.canvas} onPress={handleCanvasPress}>
        {shapes.map((shape, index) => (
          <Circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.fill} />
        ))}
      </Svg>
      <TouchableOpacity style={styles.captureButton} onPress={captureAndSave}>
        <View style={styles.captureButtonText}>
          <Text style={styles.buttonText}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  captureButton: {
    position: 'absolute',
    bottom: 0, // Place it at the bottom
    marginBottom: 250, // Adjust the margin as needed
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Make it a circle
  },
  captureButtonText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




