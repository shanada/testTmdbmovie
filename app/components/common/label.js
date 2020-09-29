import React from "react"
import { Text } from "react-native"

export const Label = props => {
    let { ellipsizeMode, text, color, size, bold, italic, lines, margin, mt, ml, mr, mb, mv, mh, align, decoration,fontWeight } = props
    return (
        <Text
            ellipsizeMode='tail'
            numberOfLines={lines == null ? 1 : lines}
            style={{
                color: color,
                fontSize: size,
                fontStyle: italic ? 'italic' : null,
                margin: margin == null ? 0 : margin,
                marginTop: mt == null ? 0 : mt,
                marginLeft: ml == null ? 0 : ml,
                marginRight: mr == null ? 0 : mr,
                marginBottom: mb == null ? 0 : mb,
                textAlign: align == null ? 'auto' : align,
                textDecorationLine: decoration,
                fontFamily: bold ? "Corbel-Bold" : "corbel-new",
                fontWeight: fontWeight? 'bold': 'normal',
            }}
        >
            {text}
        </Text>
    )
}