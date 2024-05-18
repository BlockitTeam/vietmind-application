export const RootApp = () => {
  //   const {isDoneFirstTime, user} = useAppSelector(state => state.auth);

  const renderAllScreen = () => {
    // if (!isDoneFirstTime) {
    if (true) {
      return <RootStack.Screen name="Welcome" component={WelcomeScreen} />;
    }
    if (user === null) {
      return renderAuthStack();
    }

    return renderMainStack();
  };

  return (
    <RootStack.Navigator
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}>
      {renderAllScreen()}
    </RootStack.Navigator>
  );
};
