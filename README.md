Hi and thank you for reading this tutorial.


This library aimed for simplify working with bd on Mysql.


For Example we will use table with signature like that


'''
    CREATE TABLE posts (
        id INT PRIMARY KEY AUTO_INCREMENY,
        content TEXT,
        removed BOOL NOT NULL DEFAULT FALSE,
        created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
'''

And with same signature on typescript
    
    interface post{
    
        id?: number,
        
        content?:string, 
        
        likes?:number, 
        
        created?: string | null,
        
        removed?: 0 | 1 
        
    }

This library executes all command of DML and DRL

''''''''' In examples
    I will use query exuals on QMysql lib
    And exual queryString on Mysql
'''''''''

1. First step :
    We will declare new connection to Mysql server :
        <code>var connection = new QMySql("localhost",'app','pass','social');</code>
        <code>class QMySql{params}(port,userName,userPass,dbName)</code>
    Wi will use this realization :
        <code>var connection = new QMySql("localhost",'app','pass','social');</code>

2. Second step :
    '''
        We will declare instance of table.
        We use SetTable<T>(tableName) which is method of QMySql class.
    '''
    '''
        SetTable is generic method which take one type to set signature for our table
        And also take one require argument(string) name of table with whome we work
    Wi will use this realization :
        <code>var posts = connection.SetTable<post>("posts");</code>
    '''
RESULT 

<code>import { QMySql } from '@qosh-dev/q-mysql/QMysql'</code>
<code>var connection = new QMySql("localhost",'app','pass','social');</code>
<code>var posts = connection.SetTable<post>("posts");</code>
----------------------------------------------
We will start from DRL 

1. ALL PROPS
    Queries which chose all props of object of db//////

    1. If we want select all data from table we can use query like that :
        var all = posts.toList()

        // Mysql query ' SELECT * FROM posts
        // OutPut
            <code>[</code>
                <code>{ id: 6, content: 'added', likes: 4, created: 'null', removed: 0 },</code>
                <code>{ id: 7, content: 'added', likes: 4, created: 'null', removed: 0 },</code>
                <code>{ id: 8, content: 'added', likes: 4, created: 'null', removed: 0 }</code>
            <code>]</code>
        <code>toList(): Promise<post[]></code>

    2. Add condition
            <codeL>ond = posts.Where('content = "Second"');</code>
            //Query will return type QFinish<T>
        //than we will will use QFinish's method toList()
        <code>sult = Second.toList()</code>

        // Mysql equal ' SELECT * FROM posts WHERE content = 'SECOND'
        // OutPut 
           <code>[
                { id: 2, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 45, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 47, content: 'Second', likes: 4, created: 'null', removed: 0 }
            ]</code>

        >>>>> Where(Condition: string): QFinish<post, "id" | "content" | "likes" | "created" | "removed">

    3. Add two condition
        <code>var Second = posts.Where('content = "Second" AND likes != 0 ');
        //than we will will use QFinish's method toList()
        <code>var result = Second.toList()</code>

        // Mysql equal ' SELECT * FROM posts WHERE content = 'SECOND' AND likes != 0 '
        // OutPut 
            <code>[
                { id: 2, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 45, content: 'Second', likes: 4, created: 'null', removed: 0 },
                { id: 48, content: 'Second', likes: 40, created: 'null', removed: 0 }
            ]</code>
 
    4. Class QFinish also have two interesting methods ;
        <code>OFinish<T,P extends keyof T>().OrderBy(arg: P) => QLast()</code>
        Which takes one require argument (arg : P) ''' key of '''
        
        1. OrderBy
            Example :
                <code>var temp = await posts.Where('content = "Second"').OrderBy('id')</code>
                <code>var result = temp.toList()</code>
                // Mysql equal  ' SELECT * FROM posts WHERE content = 'SECOND' AND likes != 0  ORDER BY 'id' ASC ' 
                // OutPut 
                    <code>[
                        { id: 2, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 45, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 47, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 49, content: 'Second', likes: 4, created: 'null', removed: 0 }
                    ]</code>
             >>> (method) <code>QFinish<post, "id" | "content" | "likes" | "created" | "removed">.OrderBy<"id">(prop: "id"): QLast<post, "id"></code>
      
        2. OrderByDESC
            Example :
                <code>var temp = await posts.Where('content = "Second"').OrderByDESC('id')
                <code>var result = temp.toList()</code>
                // Mysql equal  ' SELECT * FROM posts WHERE content = 'SECOND' AND likes != 0  ORDER BY 'id' DESC ' 
                // OutPut 
                    [
                        { id: 139, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 138, content: 'Second', likes: 4, created: 'null', removed: 0 },
                        { id: 137, content: 'Second', likes: 4, created: 'null', removed: 0 }
                    ]
            >>> (method) QFinish<post, "id" | "content" | "likes" | "created" | "removed">.OrderByDESC<"id">(prop: "id"): QLast<post, "id">


2. SELECT (n) PROP
    Queries which output (n) count of prop
    Method Select takes (n) count of props thanks to syntactic sugar ...(arg name)
    >>> Select(...props: "id"[]) or Select(...props: ("id" | "content" | "created")[])

    >>> Select(...props: ("id" | "content" | "likes" | "created" | "removed")[]): QTools<post, "id" | "content" | "likes" | "created" | "removed">
    Method SELECT returns instance QTools class
    1. SELECT one element 
        We want to take one prop of objects
        Query like that 'SELECT id FROM posts '
        We can use this realization :

        var posts = posts.Select('id').toList() 
        >>> (method) QType<post, "id" | "content" | "likes" | "created" | "removed">.Select<"id">(...props: "id"[]): QTools<post, "id">

        // Output :
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

        var posts = posts.Select('id','content).toList()
        >>> (method) QType<post, "id" | "content" | "likes" | "created" | "removed">.Select<"id" | "content">(...props: ("id" | "content")[]): QTools<post, "id" | "content">
        // Output :
            [
                { id: 2, content: 'Second' },
                { id: 3, content: 'Last Post!!!' },
                { id: 6, content: 'added' },
                { id: 7, content: 'added' }
            ]





    3. Class QTools<T> allows s to use methods such as AVG(), SUM(), MIN(), MAX(), DISTINCT()
        ///////Which not takes any arg
          >>>  Distinct() : QResult<T,P>;
          >>>  SUM() : QResult<T,P>;
          >>>  MIN() : QResult<T,P>;
          >>>  AVG() : QResult<T,P>;
          >>>  COunt() : QResult<T,P>;
        Example :
            var temp = posts.Select('likes').SUM()
            MYSQL '  SELECT SUM(likes) FROM posts   '
            It is recommended to call the method First() to take result
            Example :
                ret result = posts.First()
                // Output : 479
            In contrast toList()
                ret result = posts.toList()
                // Output : [ { 'SUM(likes)': 479 } ]



























    4. Adding Condition (WHERE)
        We need query 
            ' SELECT content FROM posts WHERE content = 'added'
        We use this realization :
        
        var temp = posts.Select('likes').Where('content = "added"')
        var result = await temp.toList()
        // Output 
            [
                { likes: 4 }, { likes: 4 }, { likes: 4 },
                { likes: 4 }, { likes: 4 }, { likes: 4 },
            ]







3. Additional methods fo quick queries
    1. Find(number id) //// return <T> by his id
    2. Equal(key : P,value : T[P]) /// return T[] by his props( = )
    2. NotEqual(key : P,value : T[P]) /// return T[] by his props( != )

4. Class QLast 
    1. toLast() /// return Array<T>
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
    >>> Add(objArr: T): Promise<void>
    >>> Add(objArr: T[]): Promise<void>

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
        Adding one element :
            await posts.Add(newPost)

2. Change 
    To change record in the database there is Method Update()
    Which also have to Overloads
    >>> Update(obj: post): Promise<QChange>
    >>> Update(obj: post, id: number): Promise<void>

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
        ).Where('id = 4)
    At second version you can write secon arg (id : number) for simplify your work, if you want to change record by specific id 
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















