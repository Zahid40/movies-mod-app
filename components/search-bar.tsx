import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface SearchProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeValue?: (value: string) => void;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeValue,
}: SearchProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-6 py-3 gap-3">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        onChangeText={onChangeValue}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#a8b5db"}
        className="text-white"
      />
    </View>
  );
};

export default SearchBar;
