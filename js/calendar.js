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
        googleCalendarApiKey: '// APIキーを入力',
        events: '// カレンダーIDを入力',
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
