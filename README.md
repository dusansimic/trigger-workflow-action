# dusansimic/trigger-workflow-action

With this action you can quickly trigger workflows outside of your current
repository.

## Usage

See [action.yml](./action.yml).

### Basic

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: dusansimic/trigger-workflow-action@v0
    with:
      name: main.yml
      owner: dusansimic
      repo: example
```
