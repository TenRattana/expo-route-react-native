import React, { Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "./screens/HomeScreen";
const Machine = React.lazy(() => import('./screens/MachineScreen'));
const QuestionScreen = React.lazy(() => import('./screens/QuestionScreen'));
const QuestionDetailScreen = React.lazy(() => import('./screens/QuestionDetailScreen'));
const ValidationScreen = React.lazy(() => import('./screens/ValidationScreen'));
const QuestionOptionScreen = React.lazy(() => import('./screens/QuestionOptionScreen'));
const QuestionValidationScreen = React.lazy(() => import('./screens/QuestionValidationScreen'));

const Drawer = createDrawerNavigator();

const Index = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Drawer.Navigator>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="Machine" component={Machine} />
        <Drawer.Screen name="Question" component={QuestionScreen} />
        <Drawer.Screen name="Question Option" component={QuestionOptionScreen} />
        <Drawer.Screen name="Detail Question" component={QuestionDetailScreen} />
        <Drawer.Screen name="Validation" component={ValidationScreen} />
        <Drawer.Screen name="Match Validation" component={QuestionValidationScreen} />
      </Drawer.Navigator>
    </Suspense>
  );
};

export default Index;
