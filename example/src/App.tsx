import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { savePass } from 'react-native-google-wallet';

export default function App() {
  const testpass = async () => {
    try {
      const issuerEmail =
        'wallet-service@manacommon-dev.iam.gserviceaccount.com';
      const issuerId = '3388000000022321294';
      const passClass = '3388000000022321294.mana-event';
      const passId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const newObjectJson = {
        iss: issuerEmail,
        aud: 'google',
        typ: 'savetowallet',
        iat: Math.floor(Date.now() / 1000),
        origins: [],
        payload: {
          genericObjects: [
            {
              id: `${issuerId}.${passId}`,
              classId: passClass,
              genericType: 'GENERIC_TYPE_UNSPECIFIED',
              hexBackgroundColor: '#4285f4',
              logo: {
                sourceUri: {
                  uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg',
                },
              },
              cardTitle: {
                defaultValue: {
                  language: 'en',
                  value: "Google I/O '22  [DEMO ONLY]",
                },
              },
              subheader: {
                defaultValue: {
                  language: 'en',
                  value: 'Attendee',
                },
              },
              header: {
                defaultValue: {
                  language: 'en',
                  value: 'Alex McJacobs',
                },
              },
              barcode: {
                type: 'QR_CODE',
                value: passId,
              },
              heroImage: {
                sourceUri: {
                  uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg',
                },
              },
              textModulesData: [
                {
                  header: 'POINTS',
                  body: `${Math.floor(Math.random() * 10000)}`,
                  id: 'points',
                },
                {
                  header: 'CONTACTS',
                  body: `${Math.floor(Math.random() * 99) + 1}`,
                  id: 'contacts',
                },
              ],
            },
          ],
        },
      };

      // Convertir el objeto a formato JSON
      const newObjectJsonString = JSON.stringify(newObjectJson, null, 2);
      const res = await savePass(newObjectJsonString);
      console.log('res', res);
    } catch (e) {
      console.log('Error -- ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Google Wallet</Text>
      <Button title="Add pass" onPress={testpass} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
