// Author: Bambi
// Translator to JavaScript: Mags


function getShipCourseAndSpeed(
    deck_angle_deg, boat_v_min, boat_v_max, wind_direction_deg, wind_speed_knots, desired_apparent_wind_speed_knots
) {
    // console.log(deck_angle_deg, boat_v_min, boat_v_max, wind_direction_deg, wind_speed_knots, desired_apparent_wind_speed_knots);

    const pi = Math.PI;
    const w = wind_speed_knots;
    const a = desired_apparent_wind_speed_knots;
    const DA = deck_angle_deg * pi / 180; // Deck Angle
    const V_MIN = boat_v_min; // The minimum speed the boat is allowed to go
    const V_MAX = boat_v_max;
    
    let v;
    let theta;

    // Check if we want too much apparent wind
    if (a > w + Math.cos(DA) * V_MAX) {
        // Set boat speed to max
        v = V_MAX;

        // Put apparent wind along the angled deck given v = V_MAX
        const C = Math.sqrt(Math.cos(DA) ** 2 / Math.sin(DA) ** 2 + 1);
        theta = Math.asin(v / (w * C)) - Math.asin(-1 / C);
    }
    // Check if we have too much wind
    else if (w + Math.cos(DA) * V_MIN > a) {
        // Set boat speed to minimum
        v = V_MIN;

        // Put apparent wind along the angled deck given v = V_MIN
        const C = Math.sqrt(Math.cos(DA) ** 2 / Math.sin(DA) ** 2 + 1);
        theta = Math.asin(v / (w * C)) - Math.asin(-1 / C);
    }
    // Check if we have too little wind
    else if (a * Math.sin(DA) > w) {
        theta = pi / 2;
        v = Math.sqrt(a ** 2 - w ** 2);
    }
    else {
        theta = Math.asin(a * Math.sin(DA) / w);
        v = a * Math.cos(DA) - w * Math.cos(theta);
    }

    const ship_heading = (540 + (wind_direction_deg + theta * 180 / pi)) % 360;

    // Calculate the angle of the apparent wind
    const apparent_wind_angle = Math.atan(w * Math.sin(theta) / (v + w * Math.cos(theta))) * 180 / pi;

    const apparent_wind_speed = Math.sqrt((w * Math.cos(theta) + v ) ** 2 + (Math.sin(theta) ** 2));

    const apparent_wind_speed_over_deck = apparent_wind_speed * Math.cos(DA - apparent_wind_angle*pi/180);

    const apparent_crosswind = apparent_wind_speed * Math.sin(DA - apparent_wind_angle*pi/180);

    // Calculate crosswind

    return { ship_heading: ship_heading, ship_speed: v, apparent_wind_angle: apparent_wind_angle, crosswind: apparent_crosswind, apparent_wind_speed_over_angled_deck: apparent_wind_speed_over_deck };
}

// def main():
//     try:
//         wd = float(argv[1])
//         w = float(argv[2])
//         a = float(argv[3])
//     except:
//         print(
//             f"Please run the script with the required arguments: > python {argv[0]} wind_heading_deg wind_speed_knots required_apparent_wind_knots",
//             file=stderr,
//         )
//         exit(1)

//     h, s, ad = get_ship_course_and_speed(wd, w, a)

//     print(
//         f'{"Ship Heading:":22}{h:4.1f}\n'
//         f'{"Ship Speed:":22}{s:4.1f}\n'
//         f'{"Apparent wind angle:":22}{ad:4.1f}'
//     )


// if __name__ == "__main__":
//     main()
