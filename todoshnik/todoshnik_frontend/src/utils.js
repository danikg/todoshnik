export function getCookie(cookieName) {
    const values = document.cookie.split("; ");

    for (const item of values) {
        const [key, value] = item.split("=");

        if (key === cookieName) {
            return value;
        }
    }
}

export function getColor(colorName) {
    switch (colorName) {
        case "Wh":
            return "#fafafa";
        case "Bk":
            return "#212121";
        case "Rd":
            return "#f44336";
        case "Yw":
            return "#ffeb3b";
        case "Gn":
            return "#4caf50";
        case "Bl":
            return "#03a9f4";
        case "Mt":
            return "#e91e63";
        case "Cn":
            return "#00bcd4";
    }
}

export function fixDate(date) {
    return date ? date.replace("T", " ") : null;
}

export function prepareDate(date) {
    return date ? date.replace(" ", "T") : null;
}

export default { getCookie, getColor, fixDate, prepareDate };
