package main

import (
	"fmt"
	"time"

	"github.com/wechaty/go-wechaty/wechaty"
	wp "github.com/wechaty/go-wechaty/wechaty-puppet"
	"github.com/wechaty/go-wechaty/wechaty-puppet/schemas"
	"github.com/wechaty/go-wechaty/wechaty/user"
)

func main() {
	wechaty.NewWechaty(wechaty.WithPuppetOption(wp.Option{
		Endpoint: "127.0.0.1:30001",
		Token:    "3d415ebb-7a6f-4cba-b602-1f4ae400f011",
		Timeout:  time.Duration(2 * time.Minute),
	})).
		OnScan(func(context *wechaty.Context, qrCode string, status schemas.ScanStatus, data string) {
			fmt.Printf("Scan QR Code to login: %s\nhttps://wechaty.github.io/qrcode/%s\n", status, qrCode)
		}).
		OnLogin(func(context *wechaty.Context, user *user.ContactSelf) {
			fmt.Printf("User %s logined\n", user)
		}).DaemonStart()
}
