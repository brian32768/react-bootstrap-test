# react-bootstrap-test/react-graphql

I am thinking that my application is simple so it does not need Redux or complex routing.
Pretty much it's a single form, maybe with an advanced form... so 2 forms...

On the data side, I have to access SQL Server and ugly tables.

Initially I tried making SQL relatively transparent and used REST calls.

This example will use GraphQL and hopefully encapsulate the ugly SQL tables
in the server side, passing only elegant data back to the client.

On the client side I will need a GraphQL client but I am avoiding Redux so I will try Apollo. I tried Relay and fell flat on my face. 

I have little experience with ORMs. I know they are an approach to this
problem too, but I think would also be overkill here.

So... summing up,

* client side: React and Apollo and Bootstrap and JavaScript (no TypeScript, no Redux)
* server side: Node and JavaScript and GraphQL

**TypeScript** I tried to get a handle on TypeScript and finally decided last night that I actually need
to get my app working within the next 3 weeks, not 3 years. Ugh. Typed languages slow me down
but I make just as many misteaks. C was okay and maybe C++, but C# and Java? PASS. #life2short

## GraphQL, on the server side

The client sends queries in JSON, and the server does the database work and then sends back a JSON object in the same shape.
For example, this query

    {
        instrument(id: 123456) {
            id,
            firstname,
            lastname,
            recording_date
        }
    }

might return

    {
        "instrument": {
            "id": 123456,
            "firstname" : "James",
            "lastname" : "Dean",
            "recording_date": "01-01-1957"
        }
    }

The shape of the data is determined by the client instead of the server, that's cool, that's what I want.
The server still has to map the actual database column names but I will see how to do that soon.
## Apollo

Beautiful out of box experience. I might switch to Apollo for everything.
when you set up an Apollo Server, an Apollo Sandbox will be running at root path.
The sandbox lets you test queries against the server. 

There is a server component and a client component. Better still there is
Apollo Studio which lets you see what's going on and test the server.
Studio should work with any GraphQL server, even the one I already have
running using graphql-http. 

## Resources

[Full Stack Graphql Applications: With React, Node.js, and Neo4J](https://acm.percipio.com/books/0827e186-d1c8-4a48-86a1-93e48ea0a3c3#epubcfi(/6/34!/4/2%5Bepubmain%5D/2%5Bch01lev1sec4%5D/2/2/1:0)) FYI "Neo4J" is a "graph database". Whatever that is.
I don't care. I ignored the Neo4J chapters because I have to use MS SQL.

[React Quickly—Painless Web Apps with React, JSX, Redux, and GraphQL](https://acm.percipio.com/books/0466b36a-c7fc-4ebc-9722-b431012416fb#epubcfi(/6/234!/4/2%5Bepubmain%5D/2%5Bch15%5D/2/2/1:0)) especially Chapter 15: Working with Data using GraphQL This book covers "express-graphql" which has been superceded by "graphql-http". That broke it for this newbie.

[GraphQL](https://github.com/graphql/graphql-js)

[GraphQL-HTTP](https://github.com/graphql/graphql-http)

[Apollo](https://apollographql.com) a GraphQL developer platform.

[Relay, a GraphQL client](https://relay.dev/)

### Setting up mock SQL Server

Set up a Docker with a SQL SERVER running

Create the user, database, and schema

    CREATE LOGIN crystal WITH PASSWORD='XXXXXXX', CHECK_POLICY=OFF ;
    CREATE USER crystal FOR LOGIN crystal;
    CREATE DATABASE [cc-main];
    CREATE SCHEMA ccuser;
    GRANT ALL ON [cc-main].[ccuser] TO crystal;



USE [cc-main]
SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
CREATE TABLE [ccuser].[PARTY](
	[INSTRUMENT_ID] [numeric](10, 0) NOT NULL,
	[PARTY_ID] [numeric](10, 0) NOT NULL,
	[BOOK] [varchar](10) NULL,
	[PAGE] [varchar](10) NULL,
	[PARTY_TYPE] [varchar](20) NOT NULL,
	[LAST_OR_ENTITY_NAME] [varchar](100) NOT NULL,
	[FIRST_NAME] [varchar](30) NULL,
	[MIDDLE_NAME] [varchar](30) NULL,
	[NAME_SUFFIX] [varchar](20) NULL,
	[DESCRIPTION] [varchar](100) NULL,
	[SUPPRESS_NAME_FLAG] [varchar](1) NULL,
	[SUPPRESSION_DATE] [datetime2](0) NULL,
 CONSTRAINT [SYS_C0074393] PRIMARY KEY CLUSTERED 
(
	[INSTRUMENT_ID] ASC,
	[PARTY_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
ALTER TABLE [ccuser].[PARTY]  WITH NOCHECK ADD  CONSTRAINT [SYS_C0074866] FOREIGN KEY([INSTRUMENT_ID])
REFERENCES [ccuser].[INSTRUMENT] ([INSTRUMENT_ID])
ALTER TABLE [ccuser].[PARTY] CHECK CONSTRAINT [SYS_C0074866]
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.INSTRUMENT_ID' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'INSTRUMENT_ID'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.PARTY_ID' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'PARTY_ID'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.BOOK' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'BOOK'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.PAGE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'PAGE'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.PARTY_TYPE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'PARTY_TYPE'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.LAST_OR_ENTITY_NAME' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'LAST_OR_ENTITY_NAME'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.FIRST_NAME' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'FIRST_NAME'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.MIDDLE_NAME' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'MIDDLE_NAME'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.NAME_SUFFIX' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'NAME_SUFFIX'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.DESCRIPTION' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'DESCRIPTION'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.SUPPRESS_NAME_FLAG' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'SUPPRESS_NAME_FLAG'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.SUPPRESSION_DATE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'COLUMN',@level2name=N'SUPPRESSION_DATE'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.SYS_C0074393' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'CONSTRAINT',@level2name=N'SYS_C0074393'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY.SYS_C0074393' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY', @level2type=N'CONSTRAINT',@level2name=N'SYS_C0074393'
EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.PARTY' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'PARTY'

CREATE THE INSTRUMENT TABLE

USE [cc-main]
/****** Object:  Table [ccuser].[INSTRUMENT]    Script Date: 6/14/2023 11:44:57 AM ******/
SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
CREATE TABLE [ccuser].[INSTRUMENT](
	[INSTRUMENT_ID] [numeric](10, 0) NOT NULL,
	[INSTRUMENT_TYPE_ID] [numeric](10, 0) NOT NULL,
	[INSTRUMENT_TYPE_CODE] [varchar](20) NOT NULL,
	[FEE_NUMBER] [varchar](10) NULL,
	[INDEXED_FLAG] [numeric](10, 0) NULL,
	[TOTAL_FEE] [numeric](11, 2) NOT NULL,
	[RECORDING_DATE] [datetime2](0) NOT NULL,
	[RECORDING_DESCRIPTION] [varchar](250) NULL,
	[NUMBER_OF_PAGES] [numeric](10, 0) NULL,
	[RETURN_NAME] [varchar](50) NULL,
	[RETURN_ATTN] [varchar](50) NULL,
	[RETURN_ADDRESS_1] [varchar](40) NULL,
	[RETURN_ADDRESS_2] [varchar](40) NULL,
	[RETURN_CITY] [varchar](30) NULL,
	[RETURN_STATE] [varchar](2) NULL,
	[RETURN_ZIP] [varchar](10) NULL,
	[RETURN_DATE] [datetime2](0) NULL,
	[ORIGINAL_INSTRUMENT] [varchar](12) NULL,
	[ORIGINAL_BOOK] [varchar](10) NULL,
	[ORIGINAL_PAGE] [varchar](10) NULL,
	[INSTRUMENT_STATUS] [varchar](20) NULL,
	[ASMT_ACCOUNT] [char](24) NULL,
	[RETENTION_DATE] [datetime2](0) NULL,
	[TAX_ID] [char](8) NULL,
	[WHO_MODIFIED] [varchar](20) NULL,
	[DATE_MODIFIED] [datetime2](0) NULL,
	[CONSIDERATION_AMOUNT] [numeric](13, 2) NULL,
	[IMAGE_LOCATION] [varchar](200) NULL,
	[ACCOUNT_ID] [numeric](10, 0) NULL,
	[AT_TOWNSHIP] [varchar](1) NULL,
	[AT_RANGE] [varchar](2) NULL,
	[AT_SECTION] [varchar](2) NULL,
	[AT_Q_SECTION] [varchar](1) NULL,
	[AT_QQ_SECTION] [varchar](1) NULL,
	[AT_TAXLOT] [varchar](5) NULL,
	[AT_S_I_TYPE] [varchar](20) NULL,
	[AT_S_I_NUMBER] [varchar](20) NULL,
	[AT_TAX_CODE_AREA] [varchar](4) NULL,
	[SUPPRESS_NAME_FLAG] [varchar](1) NULL,
 CONSTRAINT [SYS_C0074324] PRIMARY KEY CLUSTERED 
(
	[INSTRUMENT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 100) ON [PRIMARY]
) ON [PRIMARY]
ALTER TABLE [ccuser].[INSTRUMENT] ADD  DEFAULT ('N') FOR [SUPPRESS_NAME_FLAG]

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.INSTRUMENT_ID' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'INSTRUMENT_ID'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.INSTRUMENT_TYPE_ID' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'INSTRUMENT_TYPE_ID'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.INSTRUMENT_TYPE_CODE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'INSTRUMENT_TYPE_CODE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.FEE_NUMBER' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'FEE_NUMBER'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.INDEXED_FLAG' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'INDEXED_FLAG'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.TOTAL_FEE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'TOTAL_FEE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RECORDING_DATE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RECORDING_DATE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RECORDING_DESCRIPTION' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RECORDING_DESCRIPTION'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.NUMBER_OF_PAGES' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'NUMBER_OF_PAGES'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_NAME' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_NAME'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_ATTN' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_ATTN'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_ADDRESS_1' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_ADDRESS_1'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_ADDRESS_2' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_ADDRESS_2'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_CITY' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_CITY'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_STATE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_STATE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_ZIP' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_ZIP'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETURN_DATE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETURN_DATE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.ORIGINAL_INSTRUMENT' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'ORIGINAL_INSTRUMENT'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.ORIGINAL_BOOK' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'ORIGINAL_BOOK'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.ORIGINAL_PAGE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'ORIGINAL_PAGE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.INSTRUMENT_STATUS' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'INSTRUMENT_STATUS'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.ASMT_ACCOUNT' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'ASMT_ACCOUNT'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.RETENTION_DATE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'RETENTION_DATE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.TAX_ID' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'TAX_ID'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.WHO_MODIFIED' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'WHO_MODIFIED'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.DATE_MODIFIED' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'DATE_MODIFIED'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.CONSIDERATION_AMOUNT' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'CONSIDERATION_AMOUNT'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.IMAGE_LOCATION' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'IMAGE_LOCATION'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.ACCOUNT_ID' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'ACCOUNT_ID'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_TOWNSHIP' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_TOWNSHIP'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_RANGE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_RANGE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_SECTION' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_SECTION'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_Q_SECTION' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_Q_SECTION'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_QQ_SECTION' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_QQ_SECTION'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_TAXLOT' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_TAXLOT'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_S_I_TYPE' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_S_I_TYPE'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_S_I_NUMBER' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_S_I_NUMBER'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.AT_TAX_CODE_AREA' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'AT_TAX_CODE_AREA'


EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.INSTRUMENT.SUPPRESS_NAME_FLAG' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'TABLE',@level1name=N'INSTRUMENT', @level2type=N'COLUMN',@level2name=N'SUPPRESS_NAME_FLAG'







CREATE THE VIEW 

USE [cc-main]


/****** Object:  View [ccuser].[CLERK_V_PARTY_DIRECT]    Script Date: 6/14/2023 11:47:49 AM ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE VIEW [ccuser].[CLERK_V_PARTY_DIRECT] (
   INSTRUMENT_ID, 
   LAST_OR_ENTITY_NAME, 
   PARTY_ID, 
   BOOK, 
   PAGE, 
   PARTY_TYPE, 
   FIRST_NAME, 
   DESCRIPTION, 
   INSTRUMENT_TYPE_CODE, 
   RECORDING_DATE)
AS 
   /*Generated by SQL Server Migration Assistant for Oracle version 5.2.1259.*/
   SELECT 
      P.INSTRUMENT_ID, 
      P.LAST_OR_ENTITY_NAME, 
      P.PARTY_ID, 
      P.BOOK, 
      P.PAGE, 
      P.PARTY_TYPE, 
      P.FIRST_NAME, 
      I.RECORDING_DESCRIPTION, 
      I.INSTRUMENT_TYPE_CODE, 
      I.RECORDING_DATE
   FROM 
      ccuser.PARTY  AS P 
         LEFT OUTER JOIN ccuser.INSTRUMENT  AS I 
         ON P.INSTRUMENT_ID = I.INSTRUMENT_ID
   WHERE (
      P.PARTY_TYPE = 'Direct' OR 
      P.PARTY_TYPE = 'Plaintiff' OR 
      P.PARTY_TYPE = 'Borrower' OR 
      P.PARTY_TYPE = 'First Party' OR 
      P.PARTY_TYPE = 'Mortgagor' OR 
      P.PARTY_TYPE = 'Seller' OR 
      P.PARTY_TYPE = 'Lessor' OR 
      P.PARTY_TYPE = 'Grantor' OR 
      P.PARTY_TYPE = 'Trustor' OR 
      P.PARTY_TYPE = 'Owner' OR 
      P.PARTY_TYPE = 'Assignor' OR 
      P.PARTY_TYPE = 'Secured Party' OR 
      P.PARTY_TYPE = 'Contractor' OR 
      P.PARTY_TYPE = 'DIRECT')

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'CCUSER.CLERK_V_PARTY_DIRECT' , @level0type=N'SCHEMA',@level0name=N'ccuser', @level1type=N'VIEW',@level1name=N'CLERK_V_PARTY_DIRECT'














