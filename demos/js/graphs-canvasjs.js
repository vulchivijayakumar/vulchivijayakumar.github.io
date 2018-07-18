// graphs canvasjs
const $ = jQuery;
$(function () {
	var sessionsLastMonth = new CanvasJS.Chart('sessions_last_month', {
		animationEnabled: true,
		exportEnabled: true,
		backgroundColor: '#2B2B2B',
		title:{
			text: 'SESSIONS: LAST MONTH',
			fontFamily: 'tahoma',
			fontColor: '#797974',
			fontSize: 16
		},
		subtitles:[
			{
				text: 'g',
				fontFamily: 'tahoma',
				fontSize: 20,
				fontColor: '#0C785B',
				horizontalAlign: 'left',
				verticalAlign: 'top'
			},
			{
				text: 'last month',
				fontFamily: "tahoma",
				fontColor: '#797974',
				horizontalAlign: 'left',
				verticalAlign: 'bottom'
			}
		],
		axisX: {
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' '
		},
		axisY: {
			includeZero: false,
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' ',
			gridThickness: 0
		},
		data: [{        
			type: 'spline',
			markerType: 'none',
			lineColor: '#0C785B',
			dataPoints: [
				{ y: 450 },
				{ y: 414 },
				{ y: 520 },
				{ y: 460 },
				{ y: 450 },
				{ y: 500 },
				{ y: 480 },
				{ y: 480 },
				{ y: 410 },
				{ y: 500 },
				{ y: 480 },
				{ y: 510 }
			]
		}]
	});

	var sessionsThisMonth = new CanvasJS.Chart('sessions_this_month', {
		animationEnabled: true,
		exportEnabled: true,
		backgroundColor: '#2B2B2B',
		title:{
			text: 'SESSIONS: THIS MONTH',
			fontFamily: 'tahoma',
			fontColor: '#797974',
			fontSize: 16
		},
		subtitles:[
			{
				text: 'g',
				fontFamily: 'tahoma',
				fontSize: 20,
				fontColor: '#0C785B',
				horizontalAlign: 'left',
				verticalAlign: 'top'
			},
			{
				text: 'this month',
				fontFamily: "tahoma",
				fontColor: '#797974',
				horizontalAlign: 'left',
				verticalAlign: 'bottom'
			}
		],
		axisX: {
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' '
		},
		axisY: {
			includeZero: false,
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' ',
			gridThickness: 0
		},
		data: [{        
			type: 'line',
			markerType: 'none',
			lineColor: '#0C785B',
			dataPoints: [
				{ y: 450 },
				{ y: 414 },
				{ y: 520 },
				{ y: 460 },
				{ y: 450 },
				{ y: 500 }
			]
		}]
	});

	var userType = new CanvasJS.Chart('users_type', {
		animationEnabled: true,
		exportEnabled: true,
		backgroundColor: '#2B2B2B',
		title:{
			text: 'USER TYPE',
			fontFamily: 'tahoma',
			fontColor: '#797974',
			fontSize: 16
		},
		subtitles:[
			{
				text: 'g',
				fontFamily: 'tahoma',
				fontSize: 20,
				fontColor: '#0C785B',
				horizontalAlign: 'left',
				verticalAlign: 'top'
			},
			{
				text: 'this month',
				fontFamily: "tahoma",
				fontColor: '#797974',
				horizontalAlign: 'left',
				verticalAlign: 'bottom'
			}
		],
		data: [{        
			type: 'pie',
			startAngle: 270,
			dataPoints: [
				{ y: 70.9, color: '#0C785B' },
				{ y: 29.1, color: '#00A564', exploded: true }
			]
		}]
	});

	var usersLastMonth = new CanvasJS.Chart('user_last_month', {
		animationEnabled: true,
		exportEnabled: true,
		backgroundColor: '#2B2B2B',
		title:{
			text: 'USERS: LAST MONTH',
			fontFamily: 'tahoma',
			fontColor: '#797974',
			fontSize: 16
		},
		subtitles:[
			{
				text: 'g',
				fontFamily: 'tahoma',
				fontSize: 20,
				fontColor: '#0C785B',
				horizontalAlign: 'left',
				verticalAlign: 'top'
			},
			{
				text: 'last month',
				fontFamily: "tahoma",
				fontColor: '#797974',
				horizontalAlign: 'left',
				verticalAlign: 'bottom'
			}
		],
		axisX: {
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' '
		},
		axisY: {
			includeZero: false,
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' ',
			gridThickness: 0
		},
		data: [{        
			type: 'spline',
			markerType: 'none',
			lineColor: '#0C785B',
			dataPoints: [
				{ y: 450 },
				{ y: 414 },
				{ y: 520 },
				{ y: 460 },
				{ y: 450 },
				{ y: 500 },
				{ y: 480 },
				{ y: 480 },
				{ y: 410 },
				{ y: 500 },
				{ y: 480 },
				{ y: 510 }
			]
		}]
	});

	var usersThisMonth = new CanvasJS.Chart('users_this_month', {
		animationEnabled: true,
		exportEnabled: true,
		backgroundColor: '#2B2B2B',
		title:{
			text: 'USERS: THIS MONTH',
			fontFamily: 'tahoma',
			fontColor: '#797974',
			fontSize: 16
		},
		subtitles:[
			{
				text: 'g',
				fontFamily: 'tahoma',
				fontSize: 20,
				fontColor: '#0C785B',
				horizontalAlign: 'left',
				verticalAlign: 'top'
			},
			{
				text: 'this month',
				fontFamily: "tahoma",
				fontColor: '#797974',
				horizontalAlign: 'left',
				verticalAlign: 'bottom'
			}
		],
		axisX: {
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' '
		},
		axisY: {
			includeZero: false,
			lineThickness: 0,
			tickThickness: 0,
			valueFormatString: ' ',
			gridThickness: 0
		},
		data: [{        
			type: 'line',
			markerType: 'none',
			lineColor: '#0C785B',
			dataPoints: [
				{ y: 450 },
				{ y: 414 },
				{ y: 520 },
				{ y: 460 },
				{ y: 450 },
				{ y: 500 }
			]
		}]
	});

	sessionsLastMonth.render();
	sessionsThisMonth.render();
	userType.render();
	usersLastMonth.render();
	usersThisMonth.render();
});
