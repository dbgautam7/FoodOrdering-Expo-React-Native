import { withLayoutContext } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveScreen from '.'
import ArchiveScreen from './archive'

export const TopTabs = createMaterialTopTabNavigator()

export default function OrdersTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <TopTabs.Navigator initialRouteName="index">
        <TopTabs.Screen
          component={ActiveScreen}
          name="index"
          options={{ title: 'Active' }}
        />
        <TopTabs.Screen
          component={ArchiveScreen}
          name="archive"
          options={{ title: 'Archive' }}
        />
      </TopTabs.Navigator>
    </SafeAreaView>
  )
}
