import { useEffect, useMemo, useState } from "react";

type Reply = {
  id: number;
  text: string;
  score: number;
  createdAt: number;
};

type Comment = {
  id: number;
  text: string;
  score: number;
  createdAt: number;
  replies: Reply[];
};

const STORAGE_KEY = "comments_replay_score_pro";

function load(): Comment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: Comment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function ComentReplayScorePro() {
  const [items, setItems] = useState<Comment[]>([]);
  const [text, setText] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [replyDraft, setReplyDraft] = useState<Record<number, string>>({});
  const [replyEditing, setReplyEditing] = useState<{ commentId: number | null; replyId: number | null }>({ commentId: null, replyId: null });

  useEffect(() => {
    setItems(load());
  }, []);

  // sort comments by score desc then createdAt desc
  const sortedComments = useMemo(
    () => [...items].sort((a, b) => (b.score - a.score) || (b.createdAt - a.createdAt)),
    [items]
  );

  const resetForm = () => {
    setText("");
    setEditingId(null);
  };

  const createComment = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nextId = (items.reduce((m, it) => Math.max(m, Number(it.id ?? 0)), 0) || 0) + 1;
    const next = [...items, { id: nextId, text: trimmed, score: 0, createdAt: Date.now(), replies: [] }];
    save(next);
    setItems(next);
    resetForm();
  };

  const startEditComment = (id: number, currentText: string) => {
    setEditingId(id);
    setText(currentText);
  };

  const updateComment = () => {
    const trimmed = text.trim();
    if (!trimmed || editingId == null) return;
    const next = items.map((it) => (it.id === editingId ? { ...it, text: trimmed } : it));
    save(next);
    setItems(next);
    resetForm();
  };

  const deleteComment = (id: number) => {
    const next = items.filter((it) => it.id !== id);
    save(next);
    setItems(next);
  };

  const voteComment = (id: number, delta: number) => {
    const next = items.map((it) => (it.id === id ? { ...it, score: it.score + delta } : it));
    save(next);
    setItems(next);
  };

  // replies
  const createReply = (commentId: number) => {
    const draft = (replyDraft[commentId] ?? "").trim();
    if (!draft) return;
    const next = items.map((it) => {
      if (it.id !== commentId) return it;
      const nextReplyId = (it.replies.reduce((m, r) => Math.max(m, Number(r.id ?? 0)), 0) || 0) + 1;
      const nextReplies = [...it.replies, { id: nextReplyId, text: draft, score: 0, createdAt: Date.now() }];
      return { ...it, replies: nextReplies };
    });
    save(next);
    setItems(next);
    setReplyDraft((d) => ({ ...d, [commentId]: "" }));
  };

  const startEditReply = (commentId: number, replyId: number, currentText: string) => {
    setReplyEditing({ commentId, replyId });
    setReplyDraft((d) => ({ ...d, [commentId]: currentText }));
  };

  const updateReply = () => {
    const { commentId, replyId } = replyEditing;
    if (commentId == null || replyId == null) return;
    const trimmed = (replyDraft[commentId] ?? "").trim();
    if (!trimmed) return;
    const next = items.map((it) => {
      if (it.id !== commentId) return it;
      const nextReplies = it.replies.map((r) => (r.id === replyId ? { ...r, text: trimmed } : r));
      return { ...it, replies: nextReplies };
    });
    save(next);
    setItems(next);
    setReplyEditing({ commentId: null, replyId: null });
    setReplyDraft((d) => ({ ...d, [commentId!]: "" }));
  };

  const deleteReply = (commentId: number, replyId: number) => {
    const next = items.map((it) => {
      if (it.id !== commentId) return it;
      const nextReplies = it.replies.filter((r) => r.id !== replyId);
      return { ...it, replies: nextReplies };
    });
    save(next);
    setItems(next);
  };

  const voteReply = (commentId: number, replyId: number, delta: number) => {
    const next = items.map((it) => {
      if (it.id !== commentId) return it;
      const nextReplies = it.replies.map((r) => (r.id === replyId ? { ...r, score: r.score + delta } : r));
      return { ...it, replies: nextReplies };
    });
    save(next);
    setItems(next);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Coment Replay Score Pro</h2>

      {/* Comment create/edit */}
      <div style={{ display: "grid", gap: "0.5rem", maxWidth: 600 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Write a comment..."
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {editingId == null ? (
            <button onClick={createComment}>Create</button>
          ) : (
            <>
              <button onClick={updateComment}>Update</button>
              <button onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <hr />
      {/* List comments (sorted by score) */}
      <ul style={{ display: "grid", gap: "0.75rem", padding: 0 }}>
        {sortedComments.length === 0 && <li>No comments yet.</li>}
        {sortedComments.map((it) => {
          const sortedReplies = [...it.replies].sort((a, b) => (b.score - a.score) || (b.createdAt - a.createdAt));
          return (
            <li key={it.id} style={{ listStyle: "none", border: "1px solid #ddd", padding: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <strong>{it.score}</strong>
                <button onClick={() => voteComment(it.id, +1)}>+</button>
                <button onClick={() => voteComment(it.id, -1)}>-</button>
              </div>
              <div style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>{it.text}</div>
              <small style={{ color: "#666" }}>{new Date(it.createdAt).toLocaleString()}</small>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button onClick={() => startEditComment(it.id, it.text)}>Edit</button>
                <button onClick={() => deleteComment(it.id)}>Delete</button>
              </div>

              {/* Replies (sorted by score) */}
              <div style={{ marginTop: "0.75rem", paddingLeft: "0.5rem", borderLeft: "3px solid #eee" }}>
                <h4 style={{ margin: 0 }}>Replies</h4>
                <div style={{ display: "grid", gap: "0.5rem", maxWidth: 560 }}>
                  <textarea
                    value={replyDraft[it.id] ?? ""}
                    onChange={(e) => setReplyDraft((d) => ({ ...d, [it.id]: e.target.value }))}
                    rows={2}
                    placeholder="Write a reply..."
                  />
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {replyEditing.commentId === it.id && replyEditing.replyId != null ? (
                      <>
                        <button onClick={updateReply}>Update Reply</button>
                        <button onClick={() => { setReplyEditing({ commentId: null, replyId: null }); setReplyDraft((d) => ({ ...d, [it.id]: "" })); }}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => createReply(it.id)}>Reply</button>
                    )}
                  </div>
                </div>

                <ul style={{ display: "grid", gap: "0.5rem", padding: 0, marginTop: "0.5rem" }}>
                  {sortedReplies.length === 0 && <li>No replies yet.</li>}
                  {sortedReplies.map((r) => (
                    <li key={r.id} style={{ listStyle: "none", border: "1px solid #eee", padding: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <strong>{r.score}</strong>
                        <button onClick={() => voteReply(it.id, r.id, +1)}>+</button>
                        <button onClick={() => voteReply(it.id, r.id, -1)}>-</button>
                      </div>
                      <div style={{ whiteSpace: "pre-wrap", marginTop: "0.5rem" }}>{r.text}</div>
                      <small style={{ color: "#666" }}>{new Date(r.createdAt).toLocaleString()}</small>
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                        <button onClick={() => startEditReply(it.id, r.id, r.text)}>Edit</button>
                        <button onClick={() => deleteReply(it.id, r.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}