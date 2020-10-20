<html>
  <head>
    <meta charset="UTF-8">
    <title>CREATOR</title>
    <script type="application/javascript" src="https://unpkg.com/react@16.8.0/umd/react.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/react-dom@16.8.0/umd/react-dom.production.min.js"></script>
    <script type="application/javascript" src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const INTERVAL = 60000;
      
      function useInterval(callback) {
        const savedCallback = React.useRef();

        React.useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);

        React.useEffect(() => {
          function tick() {
            savedCallback.current();
          }

          const interval = setInterval(tick, INTERVAL);

          return () => clearInterval(interval);
        });
      }

      function App() {
        const [msg, setMsg] = React.useState("");
        const [status, setStatus] = React.useState("info");
        const [sendmethod, setSendmethod] = React.useState("email");
        const [notifications, setNotifications] = React.useState([]);

        const addNotification = (e) => {
          e.preventDefault();
          const notification = {msg, status, sendmethod, attempts: {info : 3, warning: 5, error: 8}[status]};
          const newNotifications = [...notifications, notification].sort((a, b) => {
            const p = (status) => ({info: 1, warning: 2, error: 3}[status]);
            const aP = p(a.status), bP = p(b.status);
            return bP - aP;
          });
          setNotifications(newNotifications);
        }

        const sendToGateway = () => {
          if (notifications.length) {
            const n = notifications[0];
            axios.get('/gateway.php?msg=' + n.msg + '&status=' + n.status + '&sendmethod=' + n.sendmethod).then(res => {
              switch (res.data) {
                case 'success': {
                  setNotifications(notifications.slice(1));
                  break;
                }
                case 'error': {
                  if (n.attempts > 1) setNotifications([{...n, attempts: n.attempts - 1}, ...(notifications.slice(1))]);
                  else setNotifications(notifications.slice(1));
                  break;
                }
              }
            }).catch(e => console.log(e));
          }
        }

        useInterval(sendToGateway)

        return (<div>
          <p>
            Отсылка сообщений начнётся через минуту и будет повторяться каждую минуту. <br/>
            В целях тестирования отправка сообщения методом <span style={{color: "red"}}>email</span> через gateway всегда возвращает error, а методом <span style={{color: "blue"}}>sms</span> возвращает success.
          </p>
          <form>
            <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)}></input>
            <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="info">info</option>
              <option value="warning">warning</option>
              <option value="error">error</option>
            </select>
            <select name="sendmethod" value={sendmethod} onChange={(e) => setSendmethod(e.target.value)}>
              <option value="email">email</option>
              <option value="sms">sms</option>
            </select>
            <button type="submit" onClick={addNotification}>Create notification</button>
          </form>
          <table>
            <tr>
              <th>Msg</th>
              <th>Status</th>
              <th>Method</th>
              <th>Attempts</th>
            </tr>
            {notifications.map(n =>
              <tr>
                <td>{n.msg}</td>
                <td>{n.status}</td>
                <td>{n.sendmethod}</td>
                <td>{n.attempts}</td>
              </tr>)
            }
          </table>
        </div>)
      }
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      )
    </script>
    <style>
      table {
        border: 1px solid black;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid black;
        padding: 10px;
      }
    </style>
  </body>
</html>