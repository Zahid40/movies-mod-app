import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabBarIcon = (props: { title: string; icon: any; focused: boolean }) => {
  if (props.focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className={`flex flex-row w-full flex-1 justify-center items-center min-h-16 min-w-[124px] rounded-full overflow-hidden mt-4`}
      >
        <Image source={props.icon} tintColor={"#151312"} className="size-5" />
        <Text className="text-secondary text-base font-medium ml-2">
          {props.title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={props.icon} tintColor={"#A8B5DB"} className="size-5" />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 30,
          height: 54,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 0,
          borderColor: "#0f0D23", shadowOpacity:0
        },
      }}
    >
      {[
        { title: "Home", screen: "index", icon: icons.home },
        { title: "Search", screen: "search", icon: icons.search },
        { title: "Saved", screen: "saved", icon: icons.save },
        { title: "Profile", screen: "profile", icon: icons.person },
      ].map((tab, idx) => (
        <Tabs.Screen
          key={tab.title + idx}
          name={tab.screen}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon title={tab.title} icon={tab.icon} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
