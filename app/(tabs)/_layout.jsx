import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";
const TabsLayout = () => {
  const TabBarIcon = ({ icons, color, name, focused }) => {
    return (
      <View>
        <Image
          source={{
            uri: "",
          }}
          resizeMode="contain"
          tintColor={color || "black"}
          className="w-6 h-6"
        />
        {/* <Text className={`${focused} ? "" : "" ` }> {name} </Text> */}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#23533",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tile: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tile: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="create" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tile: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="profile" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          tile: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="bookmark" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
