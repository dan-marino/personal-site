const showsRaw = {
    "improv": [
        {
            "title": "Improv Level One Class Show",
            "date": "2025-02-02",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59080"
        },
        {
            "title": "Improv Level Two Class Show",
            "date": "2025-03-30",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59265"
        },
        {
            "title": "Improv Level Three Class Show",
            "date": "2025-06-15",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59528/"
        },
        {
            "title": "Musical Improv Level One",
            "date": "2025-08-10",
            "venue": "Magnet Theater",
            "tickets": "https://magnettheater.com/show/tickets/59669"
        },
        {
            "title": "Advanced Improv Level 1 Class Show",
            "date": "2025-10-19",
            "venue": "Magnet Theater",
            "tickets" : "https://magnettheater.com/show/tickets/59701/"
        },
        {
            "title": "Advanced Improv Level 1 Class Show",
            "date": "2025-10-26",
            "venue": "Magnet Theater",
            "tickets" : "https://magnettheater.com/show/tickets/59702/"
        },
        {
            "title": "Advanced Improv Level 1 Class Show",
            "date": "2025-11-02",
            "venue": "Magnet Theater",
            "tickets" : "https://magnettheater.com/show/tickets/59703/"
        },
        {
            "title": "Advanced Improv Level 1 Class Show",
            "date": "2025-11-09",
            "venue": "Magnet Theater",
            "tickets" : "https://magnettheater.com/show/tickets/59704/"
        }
    ],
    "music": []
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