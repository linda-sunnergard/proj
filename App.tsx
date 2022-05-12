import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FlashMessage from "react-native-flash-message";

import Home from "./components/home/Home";

import { Base, Typography } from './styles';

const Tab = createBottomTabNavigator();

export default function App() {
    <SafeAreaView style={{...Base.container}}>
        <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";
  //
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#D8D8D8',
          tabBarInactiveTintColor: '#4D563A',
          headerShown: false,
          tabBarActiveBackgroundColor: '#5D894B',
          tabBarInactiveBackgroundColor: '#5D894B',
        })}
        >
        <Tab.Screen name="Home" style={{...Base.base}}>
          {() => <Home products={products} setProducts={setProducts}
          />}
        </Tab.Screen>
        <Tab.Screen name="Plock" style={{...Base.base}}>
          {() => <Pick products={products} setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Leveranser" style={{...Base.base}}>
          {() => <Deliveries deliveries={deliveries} setDeliveries={setDeliveries} />}
        </Tab.Screen>
        {isLoggedIn ?
           <Tab.Screen name="Faktura" style={{...Base.base}}>
              {() => <Invoices invoices={invoices} setInvoices={setInvoices}
              setIsLoggedIn = {setIsLoggedIn} />}
            </Tab.Screen> :
          <Tab.Screen name="Logga in" style={{...Base.base}}>
            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        }
        <Tab.Screen name="Skicka" style={{...Base.base}} component={Ship}>
        </Tab.Screen>
      </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      <FlashMessage position="bottom" />
      </SafeAreaView>
    );
  }

  const routeIcons = {
    "Lager": "leaf",
    "Plock": "gift",
    "Leveranser": "file-tray-full",
    "Logga in": "lock-open",
    "Faktura": "document-text-sharp",
    "Skicka": "car"
  };
