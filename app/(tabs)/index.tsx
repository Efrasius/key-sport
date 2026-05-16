import { ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useTeamConfig } from '../../src/hooks/useTeamConfig';
import { TeamConfig } from '../../src/config/general.config';
import { mockMatches } from '../../src/mocks/matches';
import { Match } from '../../src/types/match'
import MatchList from '../../src/components/home/MatchList';


export default function Tab() {
  const config = useTeamConfig()
  const styles = makeStyles(config.theme)


  return (
    <ScrollView  style={styles.container}>
      <MatchList
        status={'live'}
        matchList={mockMatches.filter((match) => match.status === 'live')}
      />
      <MatchList
        status={'upcoming'}
        matchList={mockMatches.filter((match) => match.status === 'upcoming')}
      />
      <MatchList
        status={'past'}
        matchList={mockMatches.filter((match) => match.status === 'won' || match.status === 'lost')}
      />
    </ScrollView >
  );
}


function makeStyles(theme: TeamConfig['theme']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
  });
}
