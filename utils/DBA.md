### Useful Mongo Queries

> Enable profiling on all queries

```
db.setProfilingLevel(2,0)
```

> Show system profile information to verify index hit (post collection in the example)

```
db.system.profile.find({ns:/chirp.posts/}).sort({ts:1}).pretty()
```

> Clear profile collection

```
db.setProfilingLevel(0)
db.system.profile.drop()
```

