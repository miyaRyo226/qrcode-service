"use client";
import { QRCodeCanvas } from "qrcode.react";
import type { ComponentProps } from "react";

type Props = Pick<ComponentProps<typeof QRCodeCanvas>, "value">;

export function QRCodeGenerator(props: Props) {
	return <QRCodeCanvas value={props.value} />;
}
