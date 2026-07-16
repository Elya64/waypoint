/* ───────────────────────────────────────────────────────────────
   app.jsx — screen router, lifted state + localStorage persistence
   ─────────────────────────────────────────────────────────────── */

const BLANK = { email: "", from: "", to: "", visa: "", when: "" };

function App() {
  const saved = loadState();
  const [screen, setScreen] = useState(saved ? saved.screen : "hero");
  const [data, setData] = useState(saved ? saved.data : { ...BLANK });
  const [tasks, setTasks] = useState(saved && saved.tasks ? saved.tasks : DEFAULT_TASKS);
  const [docs, setDocs] = useState(saved && saved.docs ? saved.docs : [
    { name: "Passport_scan.pdf", kind: "Identity", at: "earlier" },
  ]);

  // persist on every meaningful change
  useEffect(() => { saveState({ screen, data, tasks, docs }); }, [screen, data, tasks, docs]);

  const start = (email) => {
    setData({ ...BLANK, email });
    setTasks(DEFAULT_TASKS);
    setScreen("onboarding");
  };
  const restart = () => {
    clearState();
    setData({ ...BLANK });
    setTasks(DEFAULT_TASKS);
    setDocs([]);
    setScreen("hero");
  };

  return (
    <React.Fragment>
      {screen === "hero" && <Hero onStart={start} />}
      {screen === "onboarding" && (
        <Onboarding data={data} setData={setData}
          onBack={() => setScreen("hero")}
          onDone={() => setScreen("generating")} />
      )}
      {screen === "generating" && (
        <Generating data={data} onTasks={setTasks} onDone={() => setScreen("preview")} />
      )}
      {screen === "preview" && <RoadmapPreview data={data} onOpen={() => setScreen("dashboard")} />}
      {screen === "dashboard" && (
        <Dashboard data={data} tasks={tasks} setTasks={setTasks} docs={docs} setDocs={setDocs} onRestart={restart} />
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
