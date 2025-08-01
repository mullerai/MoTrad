import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="thesession"
        options={{
          title: 'Link TheSession',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sync" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tunelist"
        options={{
          title: 'Tunelist',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search Tunes',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: 'Record',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="audio" color={color} />,
        }}
      />
    </Tabs>
  );
}
