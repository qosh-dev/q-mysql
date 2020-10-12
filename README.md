Hi and thank you for reading this tutorial.
Hope you will use this package.

This library aimed for simplify working with bd on Mysql.


For Example we will use table with signature like that



    CREATE TABLE posts (
        id INT PRIMARY KEY AUTO_INCREMENY,
        content TEXT,
        removed BOOL NOT NULL DEFAULT FALSE,
        created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );


And with same signature on typescript
    
    interface post{
        id?: number,
        content?:string, 
        likes?:number, 
        created?: string | null,
        removed?: 0 | 1 
    };

This library executes all command of DML and DRL

''''''''' In examples
    I will use query exuals on QMysql lib
    And exual queryString on Mysql
'''''''''

1. First step :
    We will declare new connection to Mysql server :
    
        var connection = new QMySql("localhost",'app','pass','social');
        class QMySql{params}(port,userName,userPass,dbName);
        
    Wi will use this realization :
    
        var connection = new QMySql("localhost",'app','pass','social');

2. Second step :
        We will declare instance of table.
        We use SetTable<T>(tableName) which is method of QMySql class.
        SetTable is generic method which take one type to set signature for our table
        And also take one require argument(string) name of table with whome we work
    Wi will use this realization :
    
       var posts = connection.SetTable<post>("posts");
       
RESULT 

    import { QMySql } from '@qosh-dev/q-mysql/QMysql';
    var connection = new QMySql("localhost",'app','pass','social');
    var posts = connection.SetTable<post>("posts");
    
----------------------------------------------
We will start from DRL 

1. ALL PROPS

    Queries which chose all props of object of db//////
    1. If we want select all data from table we can use query like that :
    
            var all = posts.toList()

            Mysql query ' SELECT * FROM posts
            
         OutPut
        
            [
                { id: 6, content: 'added', likes: 4, created: 'null', removed: 0 },
                { id: 7, content: 'added', likes: 4, created: 'null', removed: 0 },
                { id: 8, content: 'added', likes: 4, created: 'null', removed: 0 }
            ]
            
            toList(): Promise<post[]>
        

    2. Add condition
    
          <code>var Second = posts.Where('content = "Second"');</code>
            
          Query will return type QFinish<T>
          Than we will will use QFinish's method toList()
        
           var result = Second.toList()
            
           Mysql equal ' SELECT * FROM posts WHERE content = 'SECOND'
             
         OutPut 
         
           [
                { id: 2, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 45, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 47, content: 'Second', likes: 4, created: 'null', removed: 0 }
           ]

        <code>Where(Condition: string): QFinish<post, "id" | "content" | "likes" | "created" | "removed"></code>

    3. Add two condition
        <code>var Second = posts.Where('content = "Second" AND likes != 0 ');</code>
        
        //than we will will use QFinish's method toList()
        
        <code>var result = Second.toList()</code>

        // Mysql equal <code>SELECT * FROM posts WHERE content = 'SECOND' AND likes != 0</code>
        
        OutPut 
        
            [
                { id: 2, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 45, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 48, content: 'Second', likes: 40, created: 'null', removed: 0 }
            ]
 
    4. Class QFinish also have two interesting methods ;
        
          <code>Finish<T,P extends keyof T>().OrderBy(arg: P) => QLast()</code>
        
        Which takes one require argument (arg : P) ''' key of '''
        
        1. OrderBy
            Example :
            
                var temp = await posts.Where('content = "Second"').OrderBy('id')
                var result = temp.toList()
                
             Mysql equal  <code>SELECT * FROM posts WHERE content = 'SECOND' AND likes != 0  ORDER BY 'id' ASC</code> 
                
             OutPut
                
                    [
                        { id: 2, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 45, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 47, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 49, content: 'Second', likes: 4, created: 'null', removed: 0 }
                    ]
             <code>QFinish<post, "id" | "content" | "likes" | "created" | "removed">.OrderBy<"id">(prop: "id"): QLast<post, "id"></code>
      
        2. OrderByDESC
            Example :
            
                var temp = await posts.Where('content = "Second"').OrderByDESC('id')
                var result = temp.toList()
                
             Mysql equal  <code> SELECT * FROM posts WHERE content = 'SECOND' AND likes != 0  ORDER BY 'id' DESC </code> 
             
             OutPut 
             
                        [
                            { id: 139, content: 'Second', likes: 4, created: 'null', removed: 0 },
                            { id: 138, content: 'Second', likes: 4, created: 'null', removed: 0 },
                            { id: 137, content: 'Second', likes: 4, created: 'null', removed: 0 }
                        ]
                    
            <code> QFinish<post, "id" | "content" | "likes" | "created" | "removed">.OrderByDESC<"id">(prop: "id"): QLast<post, "id"></code>


2. SELECT (n) PROP
    Queries which output (n) count of prop
    Method Select takes (n) count of props thanks to syntactic sugar ...(arg name)
    
    <code> Select(...props: "id"[]) or Select(...props: ("id" | "content" | "created")[])</code>

    <code>Select(...props: ("id" | "content" | "likes" | "created" | "removed")[]): QTools<post, "id" | "content" | "likes" | "created" | "removed"></code>
    
    Method SELECT returns instance QTools class
    1. SELECT one element 
        We want to take one prop of objects
        Query like that 'SELECT id FROM posts '
        We can use this realization :

         <code>var posts = posts.Select('id').toList()</code>
         
         <code> QType<post, "id" | "content" | "likes" | "created" | "removed">.Select<"id">(...props: "id"[]): QTools<post, "id"></code>

          Output
          
                [
                    { id: 2 },   
                    { id: 3 },   
                    { id: 6 },   
                    { id: 7 }
                ]

    2. SELECT two or more props
        We want to take one prop of objects
        Query like that 'SELECT id, content FROM posts '
        We can use this realization :

        <code>var posts = posts.Select('id','content).toList()</code>
        
        <code>QType<post, "id" | "content" | "likes" | "created" | "removed">.Select<"id" | "content">(...props: ("id" | "content")[]): QTools<post, "id" | "content"></code>
    
        Output
        
                    [
                        { id: 2, content: 'Second' },
                        { id: 3, content: 'Last Post!!!' },
                        { id: 6, content: 'added' },
                        { id: 7, content: 'added' }
                    ]

    3. Class QTools<T> allows s to use methods such as AVG(), SUM(), MIN(), MAX(), DISTINCT()
        ///////Which not takes any arg
          
              Distinct() : QResult<T,P>;
              SUM() : QResult<T,P>;
              MIN() : QResult<T,P>;
              AVG() : QResult<T,P>;
              Count() : QResult<T,P>;
        
        Example :
           
          <code>var temp = posts.Select('likes').SUM()</code>
            
          <code>MYSQL equal '  SELECT SUM(likes) FROM posts   '</code>
            
          It is recommended to call the method First() to take result
          Example :
            
                return posts.First()
                Output : 479
            
          In contrast toList()
          
                return posts.toList()
                Output : [ { 'SUM(likes)': 479 } ]

    4. Adding Condition (WHERE)
        We need query 
        
        <code>' SELECT content FROM posts WHERE content = 'added'</code>
        
        We use this realization :
        
        <code>var temp = posts.Select('likes').Where('content = "added"')</code>
        
        <code>var result = await temp.toList()</code>
        
        Output 
        
            [
                { likes: 4 }, { likes: 4 }, { likes: 4 },
                { likes: 4 }, { likes: 4 }, { likes: 4 },
            ]

3. Additional methods fo quick queries
    
        1. Find(number id) //// return <T> by his id
        2. Equal(key : P,value : T[P]) /// return T[] by his props( = )
        3. NotEqual(key : P,value : T[P]) /// return T[] by his props( != )

4. Class QLast 
    
        1. toList() /// return Array<T>
        2. First() /// return match el of Array<T>
        3. Paginate() {
            Takes two not required args :
                count? : number = 7,
                    Count of <T> to return
                page? : number = 1,
                    List page to return
        }

Now we try DML

1. Add 
    To add new data to table there is method Add()
    Which have to Overloads
    
        Add(objArr: T): Promise<void>
        Add(objArr: T[]): Promise<void>

    Example :
    
        var newPost : post[] = [
            {
                content : "First",
                removed : 0,
                likes : 4,
                created : 'sad'
            },
            {
                content : "Second",
                removed : 0,
                likes : 4,
            }
        ]

     Adding one element :
            
            await posts.Add(newPost[1])
            
     Adding Array of element :
     
            await posts.Add(newPost)

2. Change 
    To change record in the database there is Method Update()
    Which also have to Overloads
    
        Update(obj: post): Promise<QChange>
        Update(obj: post, id: number): Promise<void>

    First arg of method take T object 
    Example :
    
        await posts.Update(
            {
                content : "Second",
                removed : 0,
                likes : 4,
            }
        )
        
    Then you have to add Condition
            /// WHERE()
        
        await posts.Update(
            {
                content : "Second",
                removed : 0,
                likes : 4,
            }
        ).Where('id = 4')
    
    At second version you can write second arg (id : number) for simplify your work, if you want to change record by specific id 
        Example :
            
            await posts.Update(
                {
                    content : "Second",
                    removed : 0,
                    likes : 4,
                },
                4
            )

3. Delete 
    To delete record there is one method DELETE() with two overloads
    
        async Delete(id: Number): Promise<void>;
        async Delete(): Promise<QChange>;

    In first realization method takes one arg (id : number)
    Which means that you want to delete record with this id
    Second need the condition 
    //// Where()
