const showsRaw = {
    "improv": [
        {
            "title": "Improv 1",
            "date": "2025-02-02",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59080"
        },
        {
            "title": "Improv 2",
            "date": "2025-03-30",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59265"
        },
        {
            "title": "Improv 3",
            "date": "2025-06-15",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59528/"
        },
        {
            "title": "Musical Improv 1",
            "date": "2025-08-10",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59669"
        },
        {
            "title": "Advanced Improv 1",
            "date": "2025-10-19",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59701/"
        },
        {
            "title": "Advanced Improv 1",
            "date": "2025-10-26",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59702/"
        },
        {
            "title": "Advanced Improv 1",
            "date": "2025-11-02",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59703/"
        },
        {
            "title": "Advanced Improv 1",
            "date": "2025-11-09",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59704/"
        },
        {
            "title": "Musical Improv 2",
            "date": "2026-03-02",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/60212/"
        }
    ],
    "music": [
        {
            "title": "The Underground Open Mic",
            "date": "2026-04-06",
            "venue": "Bar Freda",
            "tickets": "https://www.barfreda.com/event"
        }
    ]
}

const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

// Split upcoming / past
function sortShows(shows) {
  const upcoming = shows.filter(s => s.date >= today).sort((a,b) => new Date(a.date) - new Date(b.date));
  const past = shows.filter(s => s.date < today).sort((a,b) => new Date(b.date) - new Date(a.date));
  return { upcoming, past };
}

module.exports = {
  improv: sortShows(showsRaw.improv),
  music: sortShows(showsRaw.music)
};