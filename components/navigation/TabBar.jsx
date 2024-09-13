import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import Explore from '../../app/explore';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabBar = ({ state, descriptors, navigation }) => {

    //Renkleri belirledik
    const primaryColor = '#F24405';
    const greyColor = '#ccc'

    //iconlarımızı belirledik
    const icons= {
        index: (props) => <Entypo name="home" size={20} color={greyColor} {...props} />,
        create: (props) => <AntDesign name="pluscircleo" size={20} color={greyColor} {...props} />,
        explore: (props) => <MaterialIcons name="explore" size={20} color={greyColor} {...props} />,
        profile: (props) => <AntDesign name="user" size={20} color={greyColor} {...props} />

    }

    return (
        // burada tabbbara style veriyoruz
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                // Burada sitemap ve notfound kısmını barda gözükmemesini sağlıyoruz.
                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                        // Uniq Key hatasını gideriyoruz.
                        key={route.name}
                    >
                    {/* iconlarımızı yüklüyoruz */}
                        {
                            icons[route.name]({
                                color: isFocused ? primaryColor : greyColor
                            })
                        }
                        <Text style={{ 
                            color: isFocused ? primaryColor : greyColor ,
                            fontSize:13
                            }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 4
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap:3
    }
})

export default TabBar