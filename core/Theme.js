const Color = Object.freeze({
    Primary: '--color-primary',
    PrimaryDark: '--color-primary-dark',
    PrimaryLight: '--color-primary-light',
    PrimaryText: '--color-primary-text',
    Secondary: '--color-secondary',
    SecondaryDark: '--color-secondary-dark',
    SecondaryLight: '--color-secondary-light',
    SecondaryText: '--color-secondary-text',
    Border: '--color-border',
    BorderDark: '--color-border-dark',
    Hover: '--color-hover',
    Link: '--color-link',
    Sidebar: '--color-sidebar',
    Panel: '--color-panel',
    AccentYellow: '--color-panel',
    AccentGreen: '--color-panel',
    AccentBlue: '--color-panel',
    ButtonGreen: '--color-button-green',
    ButtonRed: '--color-button-red'
})

function GetColor(colorName) {
    var style = getComputedStyle(document.querySelector(':root'))
    return style.getPropertyValue(colorName)
}

function LightenDarkenColor(color, amount) {
    color = color.trim().slice(1)

    var num = parseInt(color, 16)

    var red = (num >> 16) + amount

    if (red > 255) red = 255
    else if (red < 0) red = 0

    var blue = ((num >> 8) & 0x00ff) + amount

    if (blue > 255) blue = 255
    else if (blue < 0) blue = 0

    var green = (num & 0x0000ff) + amount

    if (green > 255) green = 255
    else if (green < 0) green = 0

    var newColor = (green | (blue << 8) | (red << 16)).toString(16)

    if (newColor.length < 6) return '#00' + newColor

    return '#' + newColor
}

export default {
    Color,
    GetColor,
    LightenDarkenColor
}
