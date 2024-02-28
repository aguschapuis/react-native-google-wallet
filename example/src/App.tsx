import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { multiply, savePass } from 'react-native-google-wallet';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  const testpass = async () => {
    try {
      const issuerEmail = 'email@example.com';
      const issuerId = '33880000000333999289';
      const passClass =
        '33880000000333999289.4e5f8a07-2ef9-4d48-91a1-601c1d006db1';
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
      <Text>Result: {result}</Text>
      <Button title="Add pass" onPress={testpass} />
    </View>
  );
}

const styles = StyleSheet.create({
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
