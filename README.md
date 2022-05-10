# notify-status

Github Action for sending pipeline notifications to `Slack` and `Teams`.

## USAGE

```yml
  - uses: marcdomain/notify-status@v1
    if: always()
    with:
      app: slack
      notify_on: success # remove notify_on to always receive notification
      status: ${{ job.status }}
      webhook_url: ${{ secrets.WEBHOOK_URL }}
      message: Notification sent successfully
```

| Arguments        | Scope     | Option                                    | Description                                  |
| ---------------- | --------- | ----------------------------------------- | ---------------------------------------------|
| app              | required  | `slack`, `teams`                          | The app you're sending the notification to.  |
| notify_on        | optional  | `success`, `failure`                      | Choose when to receive notifications         |
| status           | required  | `${{ job.status }}`                       | Always returns `success` or `failure`        |
| webhook_url      | required  | Value should be saved as secret           | Slack or teams webhook_url                   |
| message          | required  | Message to be displayed in notification   | Message to be displayed in notification      |

> ***NOTE:***

- The conditional statement `if: always()` enables a step in github actions pipeline to always run even when the preceding steps of the job failed.
- `${{ job.status }}` return the status of the job where this action is being used. To get the status of the preceding jobs, you would have to cache or archive the jobs status.
