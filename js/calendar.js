document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        buttonText: {
            today: '今月',
            month: '月',
            week: '週',
            list: 'リスト'
        },
        allDayText: '終日',


        displayEventTime: true,
        //  実装時にはAPIキーを直接書かないように！！
        googleCalendarApiKey: 'AIzaSyBHIihwp2MmPo5LpE1e9T7nVA5IB1xrB7Q',
        events: 'c_c915613dfa31fd5857c548c638368a7adfcfe0da082f05fe569fedef567c2cbe@group.calendar.google.com',
        eventClick: function(arg) {
          window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');
          arg.jsEvent.preventDefault()
        },
        locale: 'ja',
        contentHeight: 'auto',
        // 時間を表示

    });            
    calendar.render();
});
