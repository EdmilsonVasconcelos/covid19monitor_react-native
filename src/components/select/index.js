import React, { Component } from 'react';

import { Dimensions } from "react-native";

import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';

class Select extends Component {
    render() {
        const width = Dimensions.get('window').width;
        const default_values = [
            { label: "São Paulo", value: "SP" }
        ];
        return (
            <RNPickerSelect
                placeholder={{
                    label: this.props.placeholder,
                    value: null,
                    color: this.props.colorTextModal,
                }}
                useNativeAndroidPickerStyle={false}
                onValueChange={uf => uf !== null ? this.props.navigation.navigate('Details', { uf: uf }) : this.props.navigation.navigate('Home')}
                items={this.props.items.states_with_disease ? this.props.items.states_with_disease : default_values}
                style={{
                    placeholder: {
                        color: '#222'
                    },
                    inputAndroid: {
                        backgroundColor: '#eee',
                        width: width,
                        textAlign: 'center',
                        padding: 15
                    },
                    iconContainer: {
                        top: 25,
                        right: 70
                    }
                }}
                Icon={() => {
                    return <Chevron size={1.5} color="gray" />;
                }}
            />

        )
    }
}

export default Select;