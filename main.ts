/*
Riven
Microbit extension for kittenbot MiniLFR
load dependency
"minilfr": "file:../pxt-minilfr"
*/

//% color="#91a7ff" weight=10 icon="\uf061"
namespace minilfr {

    export enum SensorEnum {
        A = 1,
        B = 2,
        C = 3,
        D = 4,
        E = 5
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

    //% blockId=minilfr_spotlight block="Spotlight Left|%left Right|%right"
    //% weight=91
    export function spotLight(left: ONOFF, right: ONOFF): void {

    }

    //% blockId=minilfr_rgb_brightness block="RGB brightness %brighness"
    //% weight=90
    export function rgbBrightness(brighness: number): void {

    }

    //% blockId=minilfr_hover_rgb block="Hover RGB %rgb Color|%color"
    //% weight=89
    export function hoverRgb(rgb: RGBIDX, color: NeoPixelColors): void {

    }

    //% blockId=minilfr_motor block="Motor Speed Left|%left Right|%right"
    //% weight=79
    //% right.min=-255 right.max=255
    //% left.min=-255 left.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function motorSpeed(left: number, right: number): void {

    }

    //% blockId=minilfr_motor_delay block="Motor Speed Left|%left Right|%right Delay|%delay ms"
    //% weight=78
    //% right.min=-255 right.max=255
    //% left.min=-255 left.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function motorSpeedDelay(left: number, right: number, delay: number): void {

    }

    //% blockId=minilfr_motor_stop block="Motor Stop"
    //% weight=77
    export function motorStop(): void {

    }

    //% blockId=minilfr_buzzer block="Buzzer Freq|%freq HZ Duration|%ms ms"
    //% weight=69
    export function buzz(freq: number, ms: number): void {

    }

    /**
     * Buzzer music
     * @param notes Music notes; eg: g5:1 d c g4:2 b:1 c5:3 
    */
    //% blockId=minilfr_buzzer_music block="Buzzer Music %notes"
    //% weight=68
    export function buzzMusic(notes: string): void {

    }

    //% blockId=minilfr_ultrasonic block="Ultrasonic"
    //% weight=65
    export function Ultrasonic(pin: DigitalPin): number {
        return 0;
    }

    //% blockId=minilfr_sensor block="Sensor %sensor Value"
    //% weight=64
    export function SensorRead(sensor: SensorEnum): number {
        return 0;
    }

    //% blockId=minilfr_battery block="Battery Voltage"
    //% weight=63
    export function BatteryVoltage(): number {
        return 0;
    }

    //% blockId=minilfr_onbutton block="on Button Pressed"
    //% weight=62
    export function onLFRButton(handler: (button: string) => void): void {
        
    }

    //% blockId=minilfr_infra_send block="Infra Send %data"
    //% weight=61
    export function infraSend(data: string): void {

    }

    //% blockId=minilfr_onirrx block="on Infra Got"
    //% weight=60
    export function onInfraGot(handler: (irdata: string) => void): void {

    }

}