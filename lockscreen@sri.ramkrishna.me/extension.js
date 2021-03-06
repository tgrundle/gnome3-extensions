/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

/*
 * Simple extension to lock the screen from an icon on the panel.
 */

const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

/*const ScreenSaver = imports.misc.screenSaver;*/
const Main = imports.ui.main;
let _lockScreenButton = null;

function init() {

	_lockScreenButton = new St.Bin({ style_class: 'panel-button', 
								reactive: true,
								can_focus: true,
								x_fill: true,
								y_fill: false,
								track_hover: true });
	let icon = new St.Icon ({ icon_name: 'changes-prevent-symbolic',
								style_class: 'system-status-icon'});
	_lockScreenButton.set_child(icon);
	_lockScreenButton.connect('button-press-event', _LockScreenActivate);
}

function _LockScreenActivate () {
	Main.overview.hide();
/*	screenSaverProxy = new ScreenSaver.ScreenSaverProxy();
	screenSaverProxy.LockRemote();*/
	Main.screenShield.lock(true)
}


function enable () {
	Main.panel._rightBox.insert_child_at_index(_lockScreenButton,0);
}

function disable () {
	Main.panel._rightBox.remove_actor(_lockScreenButton);
}
