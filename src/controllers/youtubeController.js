const getPlaylist = async (req, res) => {
  const { id } = req.params;
  const apiKey = process.env.YT_API_KEY;

  try {
    // 1. Obtener videos de la playlist
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${id}&key=${apiKey}`
    );

    if (!ytRes.ok) {
      return res.status(ytRes.status).json({
        error: true,
        status: ytRes.status,
        message: `YouTube API error (videos): ${ytRes.statusText}`,
      });
    }

    const videoData = await ytRes.json();

    // 2. Obtener info de la playlist (titulo, descripcion, autor, thumbnail, etc.)
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${apiKey}`
    );

    if (!playlistRes.ok) {
      return res.status(playlistRes.status).json({
        error: true,
        status: playlistRes.status,
        message: `YouTube API error (playlist): ${playlistRes.statusText}`,
      });
    }

    const playlistData = await playlistRes.json();
    const playlistInfo = playlistData.items?.[0]?.snippet || {};

     // 3. Obtener info del canal (foto + subs)
    let channelData = {};
    if (playlistInfo.channelId) {
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${playlistInfo.channelId}&key=${apiKey}`
      );

      if (channelRes.ok) {
        const channelJson = await channelRes.json();
        const channelInfo = channelJson.items?.[0] || {};

        channelData = {
          channelId: playlistInfo.channelId,
          channelTitle: playlistInfo.channelTitle || "Unknown author",
          profilePicture: channelInfo.snippet?.thumbnails?.default?.url || null,
          subscribers: channelInfo.statistics?.subscriberCount || null,
        };
      }
    }

     res.json({
      playlist: {
        id,
        title: playlistInfo.title || "Untitled playlist",
        description: playlistInfo.description || "",
        thumbnail: playlistInfo.thumbnails?.default?.url || null,
        author: channelData,
      },
      videos: videoData.items || [],
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: "Network or server error",
      details: error.message,
    });
  }
};


module.exports = {
    getPlaylist
};