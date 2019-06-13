/*
Riven
Microbit extension for kittenbot MiniLFR
load dependency
"minilfr": "file:../pxt-minilfr"
*/

//% color="#91a7ff" weight=10 icon="\uf061"
namespace minilfr {
    type EvtStr = (data: string) => void;

    let sonarValue: number = 0;
    let batteryValue: number = 0;
    let sensorValue: number[] = [0, 0, 0, 0, 0];
    let irHandler: EvtStr = null;


    export enum SensorEnum {
        A = 1,
        B = 2,
        C = 3,
        D = 4,
        E = 5
    }

    export enum LFRMelodies {
        //% block="dadadum" blockIdentity=music.builtInMelody
        Dadadadum = 0,
        //% block="entertainer" blockIdentity=music.builtInMelody
        Entertainer,
        //% block="prelude" blockIdentity=music.builtInMelody
        Prelude,
        //% block="ode" blockIdentity=music.builtInMelody
        Ode,
        //% block="nyan" blockIdentity=music.builtInMelody
        Nyan,
        //% block="ringtone" blockIdentity=music.builtInMelody
        Ringtone,
        //% block="funk" blockIdentity=music.builtInMelody
        Funk,
        //% block="blues" blockIdentity=music.builtInMelody
        Blues,
        //% block="birthday" blockIdentity=music.builtInMelody
        Birthday,
        //% block="wedding" blockIdentity=music.builtInMelody
        Wedding,
        //% block="funereal" blockIdentity=music.builtInMelody
        Funeral,
        //% block="punchline" blockIdentity=music.builtInMelody
        Punchline,
        //% block="baddy" blockIdentity=music.builtInMelody
        Baddy,
        //% block="chase" blockIdentity=music.builtInMelody
        Chase,
        //% block="ba ding" blockIdentity=music.builtInMelody
        BaDing,
        //% block="wawawawaa" blockIdentity=music.builtInMelody
        Wawawawaa,
        //% block="jump up" blockIdentity=music.builtInMelody
        JumpUp,
        //% block="jump down" blockIdentity=music.builtInMelody
        JumpDown,
        //% block="power up" blockIdentity=music.builtInMelody
        PowerUp,
        //% block="power down" blockIdentity=music.builtInMelody
        PowerDown,
    }

    export enum NeoPixelColors {
        //% block=red
        Red = 0xFF0000,
        //% block=orange
        Orange = 0xFFA500,
        //% block=yellow
        Yellow = 0xFFFF00,
        //% block=green
        Green = 0x00FF00,
        //% block=blue
        Blue = 0x0000FF,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xFF00FF,
        //% block=white
        White = 0xFFFFFF,
        //% block=black
        Black = 0x000000
    }

    export enum RGBIDX {
        ALL = 0,
        LEFT = 1,
        RIGHT = 2
    }

    export enum ONOFF {
        ON = 1,
        OFF = 0
    }

    serial.onDataReceived('\n', function () {
        let s = serial.readString().split("\r")[0]
        let tmp = s.split(" ")

        if (tmp[0].includes("TRIG")) {
            if (tmp[1].includes("infra") && irHandler){
                irHandler(tmp[2])
            }
        } else if (tmp[0].includes("M8")) {
            batteryValue = parseFloat(tmp[1])
        } else if (tmp[0].includes("M7")) {
            sonarValue = parseInt(tmp[1])
        }

    })

    //% blockId=minilfr_init block="MiniLFR init"
    //% weight=91
    export function minilfrInit(): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, 115200)
        serial.writeString("\n\n")
    }

    //% blockId=minilfr_spotlight block="Spotlight Left|%left Right|%right"
    //% weight=91
    export function spotLight(left: ONOFF, right: ONOFF): void {
        serial.writeLine("M6 " + left + " " + right)
    }

    //% blockId=minilfr_rgb_brightness block="RGB brightness %brighness"
    //% weight=90
    export function rgbBrightness(brighness: number): void {
        serial.writeLine("M14 " + brighness)
    }

    //% blockId=minilfr_hover_rgb block="Hover RGB %rgb Color|%color"
    //% weight=89
    export function hoverRgb(rgb: RGBIDX, color: NeoPixelColors): void {
        let red = (color >> 16) & 0xff;
        let green = (color >> 8) & 0xff;
        let blue = (color) & 0xff;
        serial.writeLine("M13 " + rgb + " " + red + " " + green + " " + blue)
    }

    //% blockId=minilfr_motor block="Motor Speed Left|%left Right|%right"
    //% weight=79
    //% right.min=-255 right.max=255
    //% left.min=-255 left.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function motorSpeed(left: number, right: number): void {
        serial.writeLine("M200 " + left + " " + right)
    }

    //% blockId=minilfr_motor_delay block="Motor Speed Left|%left Right|%right Delay|%ms ms"
    //% weight=78
    //% right.min=-255 right.max=255
    //% left.min=-255 left.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function motorSpeedDelay(left: number, right: number, ms: number): void {
        serial.writeLine("M202 " + left + " " + right + " " + ms)
        basic.pause(ms);
    }

    //% blockId=minilfr_motor_stop block="Motor Stop"
    //% weight=77
    export function motorStop(): void {
        serial.writeLine("M200 0 0")
    }

    //% blockId=minilfr_buzzer block="Buzzer Freq|%freq HZ Duration|%ms ms"
    //% weight=69
    export function buzz(freq: number, ms: number): void {
        serial.writeLine("M18 " + freq + " " + ms)
    }

    /**
     * Buzzer music
     * @param notes Music notes; eg: g5:1 d c g4:2 b:1 c5:3 
    */
    //% blockId=minilfr_buzzer_music block="Buzzer Music %notes"
    //% weight=68
    export function buzzMusic(notes: string): void {
        serial.writeLine("M17 " + notes)
    }

    //% blockId=minilfr_buzzer_localmusic block="Buzzer Music %notes"
    //% weight=68
    export function buzzBuildMusic(idx: LFRMelodies): void {
        serial.writeLine("M23 " + idx)
    }

    //% blockId=minilfr_ultrasonic block="Ultrasonic"
    //% weight=65
    //% promise
    export function Ultrasonic(): number {
        serial.writeLine("M7")
        return sonarValue;
    }

    //% blockId=minilfr_sensor block="Sensor %sensor Value"
    //% weight=64
    export function SensorRead(sensor: SensorEnum): number {
        serial.writeLine("M1 " + sensor)
        return sensorValue[sensor];
    }

    //% blockId=minilfr_battery block="Battery Voltage"
    //% weight=63
    export function BatteryVoltage(): number {
        serial.writeLine("M8")
        return batteryValue;
    }

    //% blockId=minilfr_infra_send block="Infra Send %data"
    //% weight=61
    export function infraSend(data: string): void {
        serial.writeLine("M12 " + data)
    }

    //% blockId=minilfr_onirrx block="on Infra Got"
    //% weight=60
    export function onInfraGot(handler: (irdata: string) => void): void {
        irHandler = handler;
    }

}