import React, { useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Button, Text, withTheme } from 'react-native-paper';

import { View } from 'react-native';
import { SessionChart } from './session-chart';
import { timeAgo } from '../utils/time-ago';
import { styles, useMyTheme } from '../perfereneces';

const getHighestOfArray = (arr: number[]): number => {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  if (Math.abs(max) > Math.abs(min)) {
    return Math.round(max * 100) / 100;
  }
  return Math.round(min * 100) / 100;
};


export const SessionPage = () => {
  const theme = useMyTheme()
  const { colors } = theme
  // const { id } = route.params;
  const [errorLoading, setErrorLoading] = useState(false)
  const [session, setsession] = useState({ linearAccerationX: [1], linearAccerationY: [1], linearAccerationZ: [1] });
  const [sectionData, setsectionData] = useState<number[]>([]);

  // React.useEffect(() => {

  //   const sub = DataStore.observeQuery(Session, (p) =>
  //     p.id.eq(id)
  //   ).subscribe(async (snap) => {
  //     const { items } = snap;
  //     const session = items[0]
  //     if (session === undefined) {
  //       setErrorLoading(true)
  //       return
  //     }
  //     const sections = await session.sections.toArray()
  //     setsession(session);
  //     let section: number[] = []
  //     session.linearAccerationTimestamp.forEach(f => {
  //       section.push(
  //         sections.some(a => a.start < f && f < a.end) ? 5 : 0
  //       )
  //     })
  //     setsectionData(section)
  //   });

  //   return () => {
  //     sub.unsubscribe();
  //   };
  // }, [id])

  if (errorLoading === true) {
    return (
      <Text>Error loading session with id
        {/* {id} */}
      </Text>
    )
  }

  if (session === null) {
    return (
      <View style={styles(theme).container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ ...styles(theme).container, alignItems: 'flex-start' }}>
      <View style={{ height: '40%' }}>

        <SessionChart
          data={[
            session.linearAccerationX,
            session.linearAccerationY,
            session.linearAccerationZ,
            sectionData,
          ]}
        />
      </View>

      {/* <Text>Recorded: {session.createdAt ? timeAgo.format(new Date(session.createdAt)) : ''}</Text>
      <Text>Session ID: {session.id}</Text>
      <Text>Session Name: {session.name}</Text> */}
      <Text>
        Peak X Acceration: {getHighestOfArray(session.linearAccerationX)}g
      </Text>
      <Text>
        Peak Y Acceration: {getHighestOfArray(session.linearAccerationY)}g
      </Text>
      <Text>
        Peak Y Acceration: {getHighestOfArray(session.linearAccerationZ)}g
      </Text>
      {/* <Button
          mode="contained"
          color={colors.error}
          onPress={async () => {
            await Promise.all((await session.sections.toArray()).map(async section=> {
              await DataStore.delete(SessionSection, s=> s.id.eq(section.id) );
            }))

            // await API.graphql({query: deleteSession, variables:{input:{id: session.id}}})
            await DataStore.delete(session)

            navigation.goBack();
          }}
        >
          Delete Session
        </Button> */}
    </View>
  );
}
