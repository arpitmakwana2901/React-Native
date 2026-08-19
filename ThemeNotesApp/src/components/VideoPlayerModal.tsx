import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Attachment } from '../types';

interface VideoPlayerModalProps {
  visible: boolean;
  attachment: Attachment | null;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  visible,
  attachment,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!attachment) return null;

  const rawUri = attachment.url || attachment.thumbnail || attachment.file?.uri || '';

  // Generate HTML5 video player page
  const videoHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html {
            width: 100%;
            height: 100%;
            background-color: #000000;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          video {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <video 
          controls 
          autoplay 
          playsinline
          controlsList="nodownload"
          onerror="window.ReactNativeWebView.postMessage('ERROR')"
        >
          <source src="${rawUri}" />
          Your browser does not support video playback.
        </video>
      </body>
    </html>
  `;

  const handleClose = () => {
    setIsLoading(true);
    setHasError(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {attachment.name || 'Video Attachment'}
            </Text>
            <Text style={styles.subtitle}>🎬 VIDEO PLAYER</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Video Webview Player Area */}
        <View style={styles.playerContainer}>
          {rawUri && !hasError ? (
            <>
              <WebView
                originWhitelist={['*']}
                source={{ html: videoHtml, baseUrl: '' }}
                style={styles.webview}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                onMessage={(event) => {
                  if (event.nativeEvent.data === 'ERROR') {
                    setIsLoading(false);
                    setHasError(true);
                  }
                }}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
              />
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#4CAF50" />
                  <Text style={styles.loadingText}>Loading video player...</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorEmoji}>🎬❌</Text>
              <Text style={styles.errorText}>Unable to play video</Text>
              <Text style={styles.errorSubText}>
                The video URL or file path could not be loaded. Please ensure valid media attachment.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 10 : 14,
    backgroundColor: 'rgba(18, 18, 18, 0.98)',
  },
  titleContainer: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#4CAF50',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  playerContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  errorSubText: {
    color: '#AAAAAA',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default VideoPlayerModal;